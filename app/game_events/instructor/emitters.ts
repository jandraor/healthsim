
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

export const simulate = (socket, payload) => {
  socket.emit('simulate', payload);
}

export const createSession = (socket, name, nTeams) => {
  const payload = {
    'name': name,
    'nTeams': nTeams,
  }
  socket.emit('create game session', payload);
}

export const newRound = socket => {
  socket.emit('start new round');
}
