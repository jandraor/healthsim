'use strict';

const createGame = require('./createGame.js');
const sendGameDetails = require('./sendGameDetails.js');
const startGame = require('./startGame.js');
const simulate = require('./simulate.js');
const startNewRound = require('./startNewRound.js');
const getBaseRun = require('./getBaseRun.js');

const instructor = {
  'createGame': (socket, gameCollection, data, payload) => {
    createGame(socket, gameCollection, data, payload);
  },
  'sendGameDetails': (socket, gameCollection, payload) => {
    sendGameDetails(socket, gameCollection, payload);
  },
  'simulate': (socket, payload, io, gameCollection) => {
    simulate(socket, payload, io, gameCollection);
  },
  'startGame': (socket, gameCollection, io, payload) => {
    startGame(socket, gameCollection, io, payload);
  },
  'startNewRound': (socket, io) => {
    startNewRound(socket, io);
  },
  'getBaseRun': (socket, payload, io) => {
    getBaseRun(socket, payload, io);
  }
}

module.exports = instructor;
