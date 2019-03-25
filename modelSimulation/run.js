'use strict';

const writeCsv = require('../helpers/csvFiles.js');

const run = (startTime, stopTime, policyMatrix, donations) => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      if(startTime === undefined){
        throw 'startTime not specified'
      }

      if(stopTime === undefined){
        throw 'stopTime not specified'
      }

      if(policyMatrix === undefined){
        throw 'policyMatrix not specified'
      }

      if(donations === undefined){
        throw 'donations not specified'
      }

      const destinationPath = './R_Models/games/game_1/model/data/'

      //create PolicyMatrix file
      writeCsv(policyMatrix, `${destinationPath}PolicyMatrix.csv`);

      //create donations file
      writeCsv(donations, `${destinationPath}donations.csv`);

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

module.exports = run;
