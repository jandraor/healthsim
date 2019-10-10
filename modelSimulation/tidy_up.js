const tidyUp = () => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      //execute R script
      const runRScriptAsync = require('../helpers/R.js');
      const scriptPath = 'R_Models/games/game_1/call_srv_tidyup.R'
      const params = [scriptPath];
      const tidyUpResult = await runRScriptAsync(params);
      resolve(tidyUpResult)
    } catch (err) {
      reject(err)
    }
  });
  return promise
}

module.exports = tidyUp;
