'use strict';

const createGame = require('./createGame.js');
const sendGameDetails = require('./sendGameDetails.js');
const startGame = require('./startGame.js');
const setInitConditions = require('./setInitConditions.js');
const simulate = require('./simulate.js')
const createPolicyMatrix =  require('./createPolicyMatrix.js')

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
  'setInitConditions': (payload) => {
    setInitConditions(payload);
  },
  'simulate': (socket, payload) => {
    simulate(socket, payload);
  },
  'createPolicyMatrix': (payload) => {
    createPolicyMatrix(payload);
  }
}

module.exports = instructor;
