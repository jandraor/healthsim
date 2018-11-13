import * as lstn from './listeners.ts';
import * as emtr from './emitters.ts'

export const listeners = (socket) => {
  lstn.onGameCreated(socket);
  lstn.onDescriptionGiven(socket);
  lstn.onPlayerAdded(socket);
}

export const emitters = {
  'getGameDescription': (socket, gameId) => {
    emtr.getGameDescription(socket, gameId)
  }
}
