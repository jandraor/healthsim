import * as lstn from './listeners.ts';
import * as emtr from './emitters.ts'

export const listeners = (socket) => {
  lstn.onGameCreated(socket);
  lstn.onDescriptionGiven(socket);
  lstn.onPlayerAdded(socket);
  lstn.onGameStarted(socket);
  lstn.onMessage(socket);
}

export const emitters = {
  'getGameDescription': (socket, gameId) => {
    emtr.getGameDescription(socket, gameId)
  },
  'startGame': (socket, gameId) => {
    emtr.startGame(socket, gameId);
  },
  'sendMessage': (socket, payload) => {
    emtr.sendMessage(socket, payload)
  }
}
