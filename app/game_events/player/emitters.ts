export const sendMessage = (socket, payload) => {
  socket.emit('message', payload);
}
