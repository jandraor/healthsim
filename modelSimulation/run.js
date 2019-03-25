'use strict';

const run = (startTime, stopTime) => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      if(startTime === undefined){
        throw 'startTime not specified'
      }

      if(stopTime === undefined){
        throw 'stopTime not specified'
      }
      //execute R script
      const runRScriptAsync = require('../helpers/R.js');
      const scriptPath = 'R_Models/games/game_1/srv_run.R'
      const params = [scriptPath, startTime, stopTime];
      const simulationResult = await runRScriptAsync(params);
      resolve(simulationResult)
    } catch(err){
      reject(err)
    }
  });
  return promise;
}
  // return {
  //   'bot': [{'hola': 'perro', 'te': 'amo'}, {'hola': 'perro', 'te': 'ami'}],
  //   'donations': {
  //     'Financial': [[0, 4], [1, 0]],
  //     'Antivirals': [[0, 1], [0, 0]],
  //     'Ventilators': [[0, 1], [2, 0]],
  //     'Vaccines': [[0, 2], [5, 0]],
  //     'names_order': ['Alpha', 'Beta']
  //   }
  // }



module.exports = run;
