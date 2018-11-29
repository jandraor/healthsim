
export const getGameDescription = (socket, gameId) => {
  const message = {'gameId': gameId}
  socket.emit('send game details', message);
}

export const startGame = (socket, gameId) => {
  const message = {'gameId': gameId}
  socket.emit('start game', message);
}

export const sendMessage = (socket, payload) => {
  socket.emit('message', payload);
}
