import * as lstn from './listeners.ts';
import * as emtr from './emitters.ts'

export const listeners = (socket) => {
  lstn.onGameCreated(socket);
  lstn.onDescriptionGiven(socket);
  lstn.onPlayerAdded(socket);
  lstn.onGameStarted(socket);
  lstn.onMessage(socket);
  lstn.onSimulationResults(socket);
  lstn.onPlayerDecisions(socket);
}

export const emitters = {
  'createSession': (socket, name, nTeams) => {
    emtr.createSession(socket, name, nTeams);
  },
  'getGameDescription': (socket, gameId) => {
    emtr.getGameDescription(socket, gameId)
  },
  'sendPolicyMatrix': (socket, payload) => {
    emtr.sendPolicyMatrix(socket, payload);
  },
  'sendMessage': (socket, payload) => {
    emtr.sendMessage(socket, payload);
  },
  'setInitConditions': (socket, payload) => {
    emtr.setInitConditions(socket, payload);
  },
  'simulate': (socket, payload) => {
    emtr.simulate(socket, payload);
  },
  'startGame': (socket, payload) => {
    emtr.startGame(socket, payload);
  },
}
