'use strict';

const sendDecisions = (socket, io, incomingPayload) => {
  const gameId = socket.room;
  const team = socket.team;

  const outgoingPayload = {
    'team': team,
    'decisions': incomingPayload,
  }
  io.to(`instructor_${gameId}`).emit('player decisions', outgoingPayload);
  io.to(`${team}_${gameId}`).emit('player decisions received');
}

module.exports = sendDecisions;
