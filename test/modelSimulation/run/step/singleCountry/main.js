const assert = require('chai').assert;
const model = require('../../../../../modelSimulation/main.js');
const csvReader = require('csvtojson');
const basicTests = require("../../commonTests/basic.js");

describe('single countries setup', function() {
  let result, vensimOutput;

  before(async function(){
    this.timeout(5000);
    const countriesTemplate = './R_Models/games/game_1/model/data/singleCountryTemplate.csv';
    const initConditions = await csvReader().fromFile(countriesTemplate);
    const virusSeverity = 0;
    const testMode = true;
    initialisationResult = await model.initialise(initConditions, virusSeverity, testMode);
    const startTime = 0;
    const stopTime = 1;
    const donationsTemplate = "./R_Models/games/game_1/model/data/singleCountryDonationsTemplate.csv";
    const donationsInput = await csvReader().fromFile(donationsTemplate);
    const policyMatrixTemplate = "./R_Models/games/game_1/model/data/singleCountryPolicyMatrixTemplate.csv";
    const policyMatrix = await csvReader().fromFile(policyMatrixTemplate);
    result = await model.run(startTime, stopTime, policyMatrix, donationsInput);
    this.result = result;
    this.teams = ['Alpha'];
    const vensimDataPath = './R_Models/games/game_1/model/Vensim/BOT/single_team_start_0_finish_1_step_1over20.csv';
    vensimOutput = await csvReader().fromFile(vensimDataPath);
  });

  basicTests();

  it(`should have Vensim stocks`, () => {
    const vensimStocks = Object.keys(vensimOutput[vensimOutput.length - 1])
      .filter(variable => {
        return variable === 'TIME' ? false : true
      });

    const bot = result.bot
    const lastRow = bot[bot.length - 1];
    const resultVars = Object.keys(lastRow);

    vensimStocks.forEach(stock => {
      const search = resultVars.indexOf(stock);
      assert.isAtLeast(search, 0, `${stock} not found`)
    })
  });

  it(`should have the same stocks' values at time 1`, async () => {
    const vensimLastRow = vensimOutput[vensimOutput.length - 1];

    Object.keys(vensimLastRow).forEach(key => {
      vensimLastRow[key] = parseFloat(vensimLastRow[key])
    });

    const vensimStocks = Object.keys(vensimLastRow)
      .filter(variable => {
        return variable === 'TIME' ? false : true
      });

    const bot = result.bot
    const lastRow = bot[bot.length - 1];

    vensimStocks.forEach(vensimStock => {
      const expected = parseFloat(vensimLastRow[vensimStock]);
      const actual = lastRow[vensimStock];
      assert.approximately(actual, expected, 0.001, `${vensimStock} is different`)
    })
  });
});
