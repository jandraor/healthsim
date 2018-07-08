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

// Connect to mysql database
const mysql = require('mysql');

const con = mysql.createConnection({
  host: nconf.get('mysql:host'),
  user: nconf.get('mysql:user'),
  password: nconf.get('mysql:password'),
  database: nconf.get('mysql:database')
});

con.connect(err => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + con.threadId);
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

passport.serializeUser((profile, done) => done(null, {
  id:profile.id,
  provider: profile.provider,
}));
passport.deserializeUser((user,done) => done(null, user));
app.use(passport.initialize());
app.use(passport.session());

const FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy({
  clientID: nconf.get('auth:facebook:appID'),
  clientSecret: nconf.get('auth:facebook:appSecret'),
  callbackURL: new URL('/auth/facebook/callback', serviceUrl).href,
  profileFields: ['id', 'displayName', 'email', 'first_name', 'last_name'],
}, (accessToken, refreshToken, profile, done) => {
    const findUserQuery = `
      SELECT email FROM  users WHERE email = '${profile._json.email}'
    `
    console.log("---------query-----------:" + findUserQuery);

    console.log("First name: " + profile._json.first_name);
    console.log("Last name: " + profile._json.last_name);
    console.log("Email: " + profile._json.email);

    con.query(findUserQuery, (err, rows) => {
      if (err) throw err;
      console.log("length: " + rows.length);
      if(rows.length == 1){
        console.log("The user exists");
      } else if(rows.length == 0){
        console.log("Creating new user");
        done(null, profile);
        const createUserQuery = `
          INSERT INTO users VALUES('${profile._json.email}',
                                     '${profile._json.first_name}',
                                     '${profile._json.last_name}')
          `;

        con.query(createUserQuery, (err, result) => {
            if (err) throw err
            console.log("A new user has been created");
            done(null, profile);
          });
      } else{
        console.log("Something went wrong");
      }
      done(null, profile);
    })
}));

// Create auth route
app.use('/auth', require('./lib/auth.js'));

// Serve webpack assets.
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
