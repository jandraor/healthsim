import * as lstn from './listeners.ts';

export const listeners = (socket) => {
  lstn.listAvailableGames(socket);
  lstn.onPlayerAdded(socket);
}
