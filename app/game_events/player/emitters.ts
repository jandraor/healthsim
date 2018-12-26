export const sendMessage = (socket, payload) => {
  socket.emit('message', payload);
}

export const sendDecisions = (socket, payload) => {
  socket.emit('decisions sent', payload)
}
