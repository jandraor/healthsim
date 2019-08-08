'use strict';
const assert = require('chai').assert;
const basicTests = require("../../../commonTests/basic.js");
const nonNegativeTests = require("../../../commonTests/nonNegativeStocks.js");

const donateAll = () => {
  describe('donate all resources in a single step', () => {
    let result;

    const teams = [
      'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta',
      'Iota', 'Kappa'
    ];

    before(async function() {
      this.timeout(10000);
      const runRScriptAsync = require('../../../../../../helpers/R.js');
      const scriptPath = 'R_Models/games/game_1/tests/model_tests/test_cases/donate_all_single_run/main.R'
      const params = [scriptPath];
      result = await runRScriptAsync(params);
      this.result = result;
      this.teams = teams;
    });

    basicTests();

    const resources = [
      {
        'name': 'Antivirals',
        'stock': '_AVR_AVS'
      },
      {
        'name': 'Vaccines',
        'stock': '_VAC_VS'
      },
      {
        'name': 'Ventilators',
        'stock': '_VEN_VS'
      },
    ]

    resources.forEach(resource => {
      it(`Kappa's stock of ${resource.name} should increase`, () => {
        const bot = result.bot;
        const firstRow = bot[0]; // time === 0
        const lastRow = bot[bot.length - 1]; // time === 1
        const initValue = firstRow[`Kappa${resource.stock}`];
        const endValue = lastRow[`Kappa${resource.stock}`];
        const difference = endValue - initValue;
        assert.isAbove(difference, 0);
      });

      const otherTeams = teams.filter(team => {return team != 'Kappa' });
      otherTeams.map(team => {
        it(`${team}'s stock of ${resource.name} should be close to zero`, () => {
          const bot = result.bot;
          const lastRow = bot[bot.length - 1]; // time === 1
          const actual = lastRow[`${team}${resource.stock}`];
          const expected = 0
          assert.approximately(actual, expected, 5)
        });
      })
    });

    nonNegativeTests.transmissionSector();
    nonNegativeTests.financialSector();
    nonNegativeTests.vaccineSector();
    nonNegativeTests.antiviralSector();
    nonNegativeTests.ventilatorSector();
  });
}

module.exports = donateAll;
