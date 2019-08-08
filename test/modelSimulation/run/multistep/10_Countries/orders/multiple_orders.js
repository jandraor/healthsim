const assert = require('chai').assert;
const basicTests = require("../../../commonTests/basic_multistep.js");
const nonNegativeTests = require("../../../commonTests/nonNegativeStocks_multistep.js");

const test = () => {
  describe('two orders at time 0 & time 3', () => {
    let result, initConditions;

    const teams = [
      'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta',
      'Iota', 'Kappa'
    ];

    before(async function() {
      this.timeout(400000);
      const runRScriptAsync = require('../../../../../../helpers/R.js');
      const scriptPath = 'R_Models/games/game_1/tests/model_tests/test_cases/two_orders_manual_init_entire_run/main.R'
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

    it(`Alpha's spoilages rates should be 0`, () => {
      const countries = initConditions.countries;
      const [Alpha] = countries.filter(row => {return row.Name === 'Alpha' });
      const vacSpRate = Alpha.VaccineSpoilageFraction; // vaccine spoilage rate
      const antSpRate = Alpha.AntiviralSpoilageFraction; // antiviral spoilage rate
      const ventSpRate = Alpha.VentilatorSpoilageFraction; // ventilator spoilage rate
      const expected = [0, 0, 0];
      const actual = [vacSpRate, antSpRate, ventSpRate];
      assert.deepEqual(actual, expected)
    });

    it(`At time 20, Alpha's vaccine stockpile be its initial value plus placed orders`, () => {
      const countries = initConditions.countries;
      const [Alpha] = countries.filter(row => {return row.Name === 'Alpha' });
      const initStock = Alpha.InitVaccineStockpile;
      const order = 60; // See the R script
      const expected = initStock + order;
      const intervalData = result[19];
      const bot = intervalData.bot;
      const filteredBot = bot[bot.length - 1];
      const actual = filteredBot.Alpha_VAC_VS;
      assert.equal(actual, expected);
    });

    it(`At time 20, Alpha's antiviral stockpile be its initial value plus placed orders`, () => {
      const countries = initConditions.countries;
      const [Alpha] = countries.filter(row => {return row.Name === 'Alpha' });
      const initStock = Alpha.InitAntiviralStockpile;
      const order = 40; // See the R script
      const expected = initStock + order;
      const intervalData = result[19];
      const bot = intervalData.bot;
      const filteredBot = bot[bot.length - 1];
      const actual = filteredBot.Alpha_AVR_AVS;
      assert.equal(actual, expected);
    });

    it(`At time 20, Alpha's ventilator stockpile be its initial value plus placed orders`, () => {
      const countries = initConditions.countries;
      const [Alpha] = countries.filter(row => {return row.Name === 'Alpha' });
      const initStock = Alpha.InitVentilatorStockpile;
      const order = 10; // See the R script
      const expected = initStock + order;
      const intervalData = result[19];
      const bot = intervalData.bot;
      const filteredBot = bot[bot.length - 1];
      const actual = filteredBot.Alpha_VEN_VS;
      assert.equal(actual, expected);
    });
  });
}

module.exports = test;
