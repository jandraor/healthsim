'use strict';

const createGame = require('./createGame.js');
const sendGameDetails = require('./sendGameDetails.js');
const startGame = require('./startGame.js');
const simulate = require('./simulate.js')

const instructor = {
  'createGame': (socket, gameCollection, data, payload) => {
    createGame(socket, gameCollection, data, payload);
  },
  'sendGameDetails': (socket, gameCollection, payload) => {
    sendGameDetails(socket, gameCollection, payload);
  },
  'startGame': (socket, gameCollection, io, payload) => {
    startGame(socket, gameCollection, io, payload);
  },
  'simulate': (socket, payload, io, gameCollection) => {
    simulate(socket, payload, io, gameCollection);
  },
}

module.exports = instructor;
