const assert = require('chai').assert;
const basicTests = require("../../commonTests/basic.js");
const nonNegativeTests = require("../../commonTests/nonNegativeStocks.js");

const test = () => {
  describe('Supply line', () => {
    let result;

    const teams = [
      'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta',
      'Iota', 'Kappa'
    ];

    before(async function() {
      this.timeout(400000);
      const runRScriptAsync = require('../../../../../helpers/R.js');
      const scriptPath = 'R_Models/games/game_1/tests/model_tests/test_cases/multiple_orders_single_run/main.R'
      const params = [scriptPath];
      result = await runRScriptAsync(params);
      this.result = result;
      this.teams = teams;
    });

    basicTests();
    nonNegativeTests.transmissionSector();
    nonNegativeTests.financialSector();
    nonNegativeTests.vaccineSector();
    nonNegativeTests.antiviralSector();
    nonNegativeTests.ventilatorSector();

    it(`The antiviral supply line should be equal to the order`, () => {
      const bot = result.bot;
      const lastRow = bot[bot.length - 1]
      const actual = lastRow.Alpha_AVR_AVSL;
      const expected = 2016; //Value in the policy matrix
      assert.equal(actual, expected)
    });

    it(`The vaccine supply line should be equal to the order`, () => {
      const bot = result.bot;
      const lastRow = bot[bot.length - 1]
      const actual = lastRow.Alpha_VAC_VSL;
      const expected = 1003; //Value in the policy matrix
      assert.equal(actual, expected)
    });

    it(`The ventilator supply line should be equal to the order`, () => {
      const bot = result.bot;
      const lastRow = bot[bot.length - 1]
      const actual = lastRow.Alpha_VEN_VSL;
      const expected = 694; //Value in the policy matrix
      assert.equal(actual, expected)
    });
  });
}

module.exports = test;
