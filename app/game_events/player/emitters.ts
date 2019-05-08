export const getAvailableGames = (socket) => {
  socket.emit('send available games');
}

export const sendMessage = (socket, payload) => {
  socket.emit('message', payload);
}

export const sendDecisions = (socket, payload) => {
  socket.emit('decisions sent', payload)
}

export const joinGame = (socket, payload) => {
  socket.emit('join game', payload)
}
