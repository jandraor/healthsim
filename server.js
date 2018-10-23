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
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

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
const passportConfig = require('./config/passport.js');
passportConfig(app, pool2, nconf, serviceUrl);


// Create auth route
app.use('/auth', require('./lib/auth_manager.js'));

// Create sim route
app.use('/simulate', require('./lib/simulation_manager.js')(pool2));

// Create model route
app.use('/model-info', require('./lib/model_manager.js')(pool2));

// Create scenario route
app.use('/scenario', require('./lib/scenario_manager.js')(pool2));

app.get('/api/session', (req, res) => {
  const session = {auth: req.isAuthenticated()};
  res.status(200).json(session);
});

app.get('/api/user', (req, res) => {
  const user = {user: req.user.email};
  res.status(200).json(user);
});

const dbQueries = require('./helpers/dbQueries.js');
app.get('/api/instructor', async (req, res) => {
  const resultQuery = await dbQueries.checkInstructor(pool2,req.user.email);
  let result;
  if (resultQuery.length === 1){
    result = {'value': true};
  }
  if (resultQuery.length !== 1){
    result = {'value': false};
  }
  res.status(200).json(result);
});

// Creates a http secure server with the Express app as a parameter
const fs = require('fs');
const https = require('https');
const httpsOptions = {
key: fs.readFileSync(nconf.get('privateKey')),
cert: fs.readFileSync(nconf.get('certificatePem'))
};

const server = https.createServer(httpsOptions, app)
  .listen(servicePort, () => console.log('Secure Server Ready on port: ' +
                                            servicePort));

const gameCollection = {
  totalGameCount: 0,
  gameList: []
}

const io = require('socket.io')(server);

io.on('connection', function (socket) {
  console.log('A user has connected');

  socket.on('assign username', credentials => {
    console.log(credentials.email);
    socket.credentials = credentials;
    console.log(socket.credentials);
  });

  socket.on('makeGame', () => {
    console.log(`${socket.credentials.first_name} has requested to create a game`);
    gameCollection.gameList[0] = {
      'id': (Math.random() + 1).toString(36).slice(2, 18),
      'instructor': socket.credentials.email,
      'players': [] //emails
    };
    console.log(gameCollection.gameList[0]);
    socket.emit('game created');
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.credentials.first_name} ${socket.credentials.last_name} has disconnected`);
  });
});
