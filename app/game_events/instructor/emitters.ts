
export const getGameDescription = (socket, gameId) => {
  console.log('Message to ask about game details is about to be sent');
  const message = {'gameId': gameId}
  socket.emit('send team details', message);
}
