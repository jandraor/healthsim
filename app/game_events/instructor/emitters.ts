
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

export const sendPolicyMatrix = (socket, payload) => {
  socket.emit('create policy matrix', payload);
}

export const createSession = (socket, name, nTeams) => {
  const payload = {
    'name': name,
    'nTeams': nTeams,
  }
  socket.emit('create game session', payload);
}
