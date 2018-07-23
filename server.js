'use strict';
const pkg = require('./package.json');
const {URL} = require('url');
const path = require('path');


// nconf configuration.
const nconf = require('nconf');
nconf
  .argv()
  .env('__')
  .defaults({'NODE_ENV': 'development'});

const NODE_ENV = nconf.get('NODE_ENV');
const isDev = NODE_ENV === 'development';
nconf
  .defaults({'conf': path.join(__dirname, `${NODE_ENV}.config.json`)})
  .file(nconf.get('conf'));

const serviceUrl = new URL(nconf.get('serviceUrl'));
const servicePort =
  serviceUrl.port || (serviceUrl.protocol === 'https:' ? 443 : 80);

// Express and middleware.
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

// Serve webpack assets.
// Must come before passport.session()
if (isDev) {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('./webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConfig), {
    publicPath: '/',
    stats: {colors: true},
  }));
  } else {
    app.use(express.static('dist'));
  }

// Connect to mysql database
const mysql = require('mysql');

const pool = mysql.createPool({
  host: nconf.get('mysql:host'),
  user: nconf.get('mysql:user'),
  password: nconf.get('mysql:password'),
  database: nconf.get('mysql:database'),
  connectionLimit: 10
});

// Connect to mysql database using mysql-promise
const mysql2 = require('promise-mysql');

const pool2 = mysql2.createPool({
  host: nconf.get('mysql:host'),
  user: nconf.get('mysql:user'),
  password: nconf.get('mysql:password'),
  database: nconf.get('mysql:database'),
  connectionLimit: 10
});

// Setup Express sessions.
const expressSession = require('express-session');
if (isDev) {
  // Use FileStore in development.
  const FileStore = require('session-file-store')(expressSession);
  app.use(expressSession({
    resave: false,
    saveUnitialized: true,
    secret: 'unguessable',
    store: new FileStore(),
  }));
} else {
  // Use RedisStore in production mode.
}

// Passport Authentication.
const passport = require('passport');

passport.serializeUser((user, done) => {
  console.log("serialising: " + done);
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  const findUserQuery = `
    SELECT
      email
    FROM
      users
    WHERE
      email = '${email}'
  `;

  pool.getConnection((err, connection) => {
    connection.query(findUserQuery, (err, queryResult) => {
      connection.release(); //release the connection
      if (err) throw err;

      if(queryResult.length == 1){
        const user = {"email": queryResult[0].email};
        done(err, user);
      }

    });
  });
});

const FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy({
  clientID: nconf.get('auth:facebook:appID'),
  clientSecret: nconf.get('auth:facebook:appSecret'),
  callbackURL: new URL('/auth/facebook/callback', serviceUrl).href,
  profileFields: ['id', 'displayName', 'email', 'first_name', 'last_name'],
}, (accessToken, refreshToken, profile, done) => {
      const findUserQuery = `
        SELECT
          email
        FROM
          users
        WHERE
          email = '${profile._json.email}'
      `;
      //check if user already exists in the db
      pool.getConnection((err, connection) => {
        connection.query(findUserQuery, (err, queryResult) => {
          connection.release(); //release the connection
          if (err) throw err;
          console.log("length: " + queryResult.length);

          if(queryResult.length == 1){
            console.log("User already exists");
            const currentUser = {"email": queryResult[0].email };
            done(null, currentUser);
          } else if(queryResult.length == 0){
              const createUserQuery = `
              INSERT INTO users VALUES('${profile._json.email}',
                                       '${profile._json.first_name}',
                                       '${profile._json.last_name}')
              `;
            //creates a new user
            pool.getConnection((err, connection) => {

              connection.query(createUserQuery, (err, result) => {
                connection.release(); //release the connection
                if (err) throw err;
                console.log("A new user has been created");
                const newUser = {"email": profile._json.email};
                done(null, newUser);
              });

            });

          } else{
            throw "Duplicated users";
          }

        });
      });
}));

app.use(passport.initialize());
app.use(passport.session());

// Create auth route
app.use('/auth', require('./lib/auth_manager.js'));

// Create sim route
app.use('/simulate', require('./lib/simulation_manager.js')(pool2));

// Create model route
app.use('/model-info', require('./lib/model_manager.js')(pool));

app.get('/api/session', (req, res) => {
  const session = {auth: req.isAuthenticated()};
  res.status(200).json(session);
});

// Creates a http secure server with the Express app as a parameter
const fs = require('fs');
const https = require('https');
const httpsOptions = {
key: fs.readFileSync(nconf.get('privateKey')),
cert: fs.readFileSync(nconf.get('certificatePem'))
};

https.createServer(httpsOptions, app)
  .listen(servicePort, () => console.log('Secure Server Ready on port: ' +
                                            servicePort));
