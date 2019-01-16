'use strict';

const simulate = async (socket, payload) => {
  try {
    //Policy matrix file is created
    const writeCsv = require('../../../helpers/csvFiles.js');
    writeCsv(payload.policyMatrix, './R_Models/games/game_1/model/data/PolicyMatrix.csv');
    //The model is simulated;
    const runRScriptAsync = require('../../../helpers/R.js')
    const params = ['R_Models/games/game_1/srv_run.R', 0, 1]
    const responsePayload = await runRScriptAsync(params);
    socket.emit('simulation results', responsePayload)
  } catch(error) {
    console.log(error);
    throw error
  }
}

module.exports = simulate;
