import * as lstn from './listeners.ts';
import * as emtr from './emitters.ts'

export const listeners = (socket) => {
  lstn.listAvailableGames(socket);
  lstn.onPlayerAdded(socket);
  lstn.onGameStarted(socket);
  lstn.onMessage(socket);
  lstn.onPlayerDecisions(socket);
  lstn.onSimulationResults(socket);
}

export const emitters = {
  'getAvailableGames': (socket) => {
    emtr.getAvailableGames(socket);
  },
  'sendMessage': (socket, payload) => {
    emtr.sendMessage(socket, payload);
  },
  'sendDecisions': (socket, payload) => {
    emtr.sendDecisions(socket, payload);
  }
}
