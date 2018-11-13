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
  socket.emit('are there games');
}

export const playerListeners = (socket) => {
  player.listeners(socket);
}

export const instructorListeners = (socket) => {
  instructor.listeners(socket);
}

export const instructorEmitters = {
  'getGameDescription': (socket,gameId) => {
    instructor.emitters.getGameDescription(socket, gameId);
  }
}
