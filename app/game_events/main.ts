const $ = require('jquery');
import * as player from './player/main.ts';
import * as instructor from './instructor/main.ts';

export const sendCredentials = (socket) => {
  const credentials = {
    'email': 'jair.albert.andrade',
    'first_name': 'Jair',
    'last_name': 'Andrade'
  }
  socket.emit('assign username', credentials);
}

export const playerListeners = (socket) => {
  player.listeners(socket);
}

export const playerEmitters = {
  'getAvailableGames': (socket) => {
    player.emitters.getAvailableGames(socket);
  },
  'sendDecisions': (socket, payload) => {
    player.emitters.sendDecisions(socket, payload);
  },
  'sendMessage': (socket, payload) => {
    player.emitters.sendMessage(socket, payload);
  }
}
//------------------------------------------------------------------------------
// Instructor events
//------------------------------------------------------------------------------
export const instructorListeners = (socket) => {
  instructor.listeners(socket);
}

export const instructorEmitters = {
  'createSession': (socket, name, nTeams) => {
    instructor.emitters.createSession(socket, name, nTeams);
  },
  'getGameDescription': (socket, gameId) => {
    instructor.emitters.getGameDescription(socket, gameId);
  },
  'sendMessage': (socket, payload) => {
    instructor.emitters.sendMessage(socket, payload);
  },
  'simulate': (socket, payload) => {
    instructor.emitters.simulate(socket, payload);
  },
  'sendPolicyMatrix': (socket, payload) => {
    instructor.emitters.sendPolicyMatrix(socket, payload);
  },
  'startGame': (socket, payload) => {
    instructor.emitters.startGame(socket, payload);
  },
}
