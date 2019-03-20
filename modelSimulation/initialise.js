
const initialise = (initConditions, virusSeverity, testMode) => {
  const promise = new Promise(async (resolve, reject) => {
    try {

      if(initConditions === undefined){
        throw 'initConditions not specified'
      }

      if(virusSeverity === undefined){
        throw 'virusSeverity not specified'
      }
      //create countries file
      const writeCsv = require('../helpers/csvFiles.js');
      writeCsv(initConditions, './R_Models/games/game_1/model/data/Countries.csv');
      //execute R script
      const runRScriptAsync = require('../helpers/R.js');
      const scriptPath = 'R_Models/games/game_1/srv_initialise.R'
      const params = [scriptPath, virusSeverity, testMode];
      const initialisationResult = await runRScriptAsync(params);
      resolve(initialisationResult)
    } catch (err) {
      reject(err)
    }
  });
  return promise
}

module.exports = initialise;
