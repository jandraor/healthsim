'use strict';

const simulate = async (socket, payload, io, gameCollection) => {
  try {
    const gameId = socket.room;
    //The model is simulated;
    const model = require('../../../modelSimulation/main.js');
    const startTime = payload.startTime;
    const stopTime = payload.finishTime;
    const policyMatrix = payload.policyMatrix;
    const donations = payload.donations;
    const simulationResult = await model.run(startTime, stopTime,
      policyMatrix, donations);
    const bot = simulationResult.bot; // behaviour over time
    const resultVariables = Object.keys(bot[0]);
    //==========================================================================
    //=======To instructor======================================================
    //==========================================================================
    io.to(`instructor_${gameId}`).emit('simulation result', simulationResult);
    //==========================================================================
    //=======To players======================================================
    //==========================================================================
    const getTeamNames = require('../helpers/getTeamNames.js');
    const teams = getTeamNames(gameId, gameCollection);
    teams.forEach(recipientTeam => {
      const teamVariables = resultVariables.filter(variable => {
        return variable.includes(recipientTeam);
      });
      teamVariables.unshift('time');
      const playerPayload = bot.map(row => {
        const filteredRow = Object.keys(row)
          .filter(variableName => teamVariables.includes(variableName))
          .reduce((obj, variableName) => {
            obj[variableName] = row[variableName];
            return obj;
           }, {});
        return filteredRow;
      });

      io.to(`${recipientTeam}_${gameId}`).emit('simulation result', playerPayload);
    });
  } catch(error) {
    console.log(error);
    throw error
  }
}

module.exports = simulate;
