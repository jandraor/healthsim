'use strict';

const newRound = (socket, io) => {
  const gameId = socket.room;
  io.to(gameId).emit('new round started');
}

module.exports = newRound;
