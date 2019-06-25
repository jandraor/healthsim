const assert = require('chai').assert;
const basicTests = require("../../commonTests/basic_multistep.js");
const nonNegativeTests = require("../../commonTests/nonNegativeStocks_multistep.js");

const test = () => {
  describe('no player actions', () => {
    let result;

    const teams = [
      'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta',
      'Iota', 'Kappa'
    ];

    before(async function() {
      this.timeout(100000);
      const runRScriptAsync = require('../../../../../helpers/R.js');
      const scriptPath = 'R_Models/games/game_1/tests/model_tests/test_cases/basic_entire_run/main.R'
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
  });
}

module.exports = test;
