import * as lstn from './listeners.ts';
import * as emtr from './emitters.ts'

export const listeners = (socket) => {
  lstn.onGameCreated(socket);
  lstn.onDescriptionGiven(socket);
  lstn.onPlayerAdded(socket);
  lstn.onGameStarted(socket);
  lstn.onMessage(socket);
  lstn.onSimulationResults(socket);
}

export const emitters = {
  'getGameDescription': (socket, gameId) => {
    emtr.getGameDescription(socket, gameId)
  },
  'startGame': (socket, payload) => {
    emtr.startGame(socket, payload);
  },
  'sendMessage': (socket, payload) => {
    emtr.sendMessage(socket, payload);
  },
  'setInitConditions': (socket, payload) => {
    emtr.setInitConditions(socket, payload);
  },
  'simulate': (socket, payload) => {
    emtr.simulate(socket, payload);
  }
}
