const assert = require('chai').assert;
const basicTests = require("../../commonTests/basic_multistep.js");
const nonNegativeTests = require("../../commonTests/nonNegativeStocks_multistep.js");

const test = () => {
  describe('equal conditions', () => {
    let result;

    const teams = [
      'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta',
      'Iota', 'Kappa'
    ];

    before(async function() {
      this.timeout(400000);
      const runRScriptAsync = require('../../../../../helpers/R.js');
      const scriptPath = 'R_Models/games/game_1/tests/model_tests/test_cases/equal_conditions_manual_init_entire_run/main.R';
      const params = [scriptPath];
      const output = await runRScriptAsync(params);
      result = output.simResult;
      initConditions = output.initConditions
      this.result = result;
      this.teams = teams;
    });

    basicTests();
    nonNegativeTests.transmissionSector();
    nonNegativeTests.financialSector();
    nonNegativeTests.vaccineSector();
    nonNegativeTests.antiviralSector();
    nonNegativeTests.ventilatorSector();

    it(`All teams should accumulate the same opportunity cost`, () => {
      const intervalData = result[19];
      const bot = intervalData.bot;
      const filteredBot = bot[bot.length - 1];

      const actual = teams.map(team => {
        return filteredBot[`${team}_FM_COC`]
      });

      const alphaResult = filteredBot.Alpha_FM_COC;
      const expected = Array(10).fill(alphaResult)
      assert.deepEqual(actual, expected);
    });
  });
}

module.exports = test;
