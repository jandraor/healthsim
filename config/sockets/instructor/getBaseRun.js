'use strict';

const getBaseRun = async(socket, payload, io) => {
  try {
    const gameId = socket.room;
    const model = require('../../../modelSimulation/main.js');
    const stopTime = payload.stopTime;
    const simulationResult = await model.baseRun(stopTime);
    console.log('... sending base case scenario...')
    io.to(`instructor_${gameId}`).emit('base run', simulationResult);
  } catch(err) {
    console.log(err);
    throw error
  }
}

module.exports = getBaseRun;
