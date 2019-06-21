
const initialise = (initConditions, virusSeverity, testMode, manualSetup,
  countrySetup) => {
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

      //
      if(manualSetup === true) {
        if(countrySetup === undefined){
          throw 'countrySetup not specified'
        }
        writeCsv(countrySetup,
          './R_Models/games/game_1/model/data/countries_MOCK_UP.csv');
      }
      //execute R script
      const runRScriptAsync = require('../helpers/R.js');
      const scriptPath = 'R_Models/games/game_1/call_srv_initialise.R'
      const params = [scriptPath, virusSeverity, testMode, manualSetup];
      const initialisationResult = await runRScriptAsync(params);
      resolve(initialisationResult)
    } catch (err) {
      reject(err)
    }
  });
  return promise
}

module.exports = initialise;
