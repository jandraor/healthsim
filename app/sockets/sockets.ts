export const sendGame = (socket) => {
  socket.emit('makeGame')
}
