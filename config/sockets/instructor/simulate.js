'use strict';

const simulate = async (socket, payload, io, gameCollection) => {
  try {
    console.log('simulaiton payload===========================================')
    console.log(payload);
    console.log('simulaiton payload===========================================')
    const gameId = socket.room;
    //Policy matrix file is created
    const writeCsv = require('../../../helpers/csvFiles.js');
    writeCsv(payload.policyMatrix, './R_Models/games/game_1/model/data/PolicyMatrix.csv');
    //The model is simulated;
    const runRScriptAsync = require('../../../helpers/R.js');
    const startTime = payload.startTime;
    const stopTime = payload.finishTime;
    const params = ['R_Models/games/game_1/srv_run.R', startTime, stopTime];
    console.log('=============================params===========================')
    console.log(params);
    console.log('=============================params===========================')
    const simulationResult = await runRScriptAsync(params);
    const resultVariables = Object.keys(simulationResult[0]);
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
      const playerPayload = simulationResult.map(row => {
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
