const baseRun = (stopTime, virusSeverity) => {
  const promise = new Promise(async (resolve, reject) => {
    try {

      if(stopTime === undefined){
        throw 'stopTime not defined'
      }

      if(virusSeverity === undefined){
        throw 'virus severity not defined'
      }

      //execute R script
      const runRScriptAsync = require('../helpers/R.js');
      const scriptPath = 'R_Models/games/game_1/get_base_run.R'
      const step = 1 / 32;
      const integrationMethod = 'euler';
      const params = [scriptPath, stopTime, step, integrationMethod, virusSeverity];
      const simResult = await runRScriptAsync(params);
      resolve(simResult)
    } catch (err) {
      reject(err)
    }
  });
  return promise
}

module.exports = baseRun;
