'use strict';

const sendDecisions = (socket, io, incomingPayload) => {
  const gameId = socket.room;
  const team = socket.team;

  const outgoingPayload = {
    'team': team,
    'decisions': incomingPayload,
  }
  io.to(`instructor_${gameId}`).emit('player decisions', outgoingPayload);
}

module.exports = sendDecisions;
