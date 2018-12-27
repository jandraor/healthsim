import * as lstn from './listeners.ts';
import * as emtr from './emitters.ts'

export const listeners = (socket) => {
  lstn.listAvailableGames(socket);
  lstn.onPlayerAdded(socket);
  lstn.onGameStarted(socket);
  lstn.onMessage(socket);
  lstn.onPlayerDecisions(socket);
}

export const emitters = {
  'sendMessage': (socket, payload) => {
    emtr.sendMessage(socket, payload);
  },
  'sendDecisions': (socket, payload) => {
    emtr.sendDecisions(socket, payload);
  }
}
