
export const getGameDescription = (socket, gameId) => {
  const message = {'gameId': gameId}
  socket.emit('send game details', message);
}

export const startGame = (socket, payload) => {
  socket.emit('start game', payload);
}

export const sendMessage = (socket, payload) => {
  socket.emit('message', payload);
}

export const setInitConditions = (socket, payload) => {
  socket.emit('set initial conditions', payload);
}

export const simulate = (socket, payload) => {
  socket.emit('simulate', payload);
}
