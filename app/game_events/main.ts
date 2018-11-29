const $ = require('jquery');
import * as player from './player/main.ts';
import * as instructor from './instructor/main.ts';


export const sendGame = (socket, name, nTeams) => {
  const gameSetup = {
    'name': name,
    'nTeams': nTeams,
  }
  socket.emit('makeGame', gameSetup);
}

export const sendCredentials = (socket) => {
  const credentials = {
    'email': 'jair.albert.andrade',
    'first_name': 'Jair',
    'last_name': 'Andrade'
  }
  socket.emit('assign username', credentials);
}

export const getAvailableGames = (socket) => {
  socket.emit('send available games');
}

export const playerListeners = (socket) => {
  player.listeners(socket);
}

export const playerEmitters = {
  'sendMessage': (socket, payload) => {
    player.emitters.sendMessage(socket, payload);
  }
}

export const instructorListeners = (socket) => {
  instructor.listeners(socket);
}

export const instructorEmitters = {
  'getGameDescription': (socket, gameId) => {
    instructor.emitters.getGameDescription(socket, gameId);
  },
  'startGame': (socket, gameId) => {
    instructor.emitters.startGame(socket, gameId);
  },
  'sendMessage': (socket, payload) => {
    instructor.emitters.sendMessage(socket, payload);
  }
}
