'use strict';

const sendAvailableGames = require('./sendAvailableGames.js');
const joinGame = require('./joinGame.js');
const sendDecisions = require('./sendDecisions.js');

const player = {
  'joinGame': (socket, gameCollection, io, data) => {
    joinGame(socket, gameCollection, io, data);
  },
  'sendAvailableGames': (socket, gameCollection) => {
    sendAvailableGames(socket, gameCollection);
  },
  'sendDecisions': (socket, io, payload) => {
    sendDecisions(socket, io, payload);
  },
}

module.exports = player;
