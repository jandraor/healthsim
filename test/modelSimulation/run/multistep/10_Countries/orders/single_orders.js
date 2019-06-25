const assert = require('chai').assert;
const basicTests = require("../../../commonTests/basic_multistep.js");
const nonNegativeTests = require("../../../commonTests/nonNegativeStocks_multistep.js");

const test = () => {
  describe('orders at time 0', () => {
    let result, initConditions;

    const teams = [
      'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta',
      'Iota', 'Kappa'
    ];

    before(async function() {
      this.timeout(100000);
      const runRScriptAsync = require('../../../../../../helpers/R.js');
      const scriptPath = 'R_Models/games/game_1/tests/model_tests/test_cases/single_order_manual_init_entire_run/main.R'
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

    it(`Alpha's vaccine stockpile should increase by the order amount at the delay time + 1`, () => {
      const countries = initConditions.countries;
      const [Alpha] = countries.filter(row => {return row.Name === 'Alpha' });
      const initStock = Alpha.InitVaccineStockpile;
      const delay = Alpha.VaccineShipmentDelay;
      const order = 30; // See the R script
      const expected = initStock + order;
      // Each object in result object goes from i to i + 1.
      // Here, result is subset to the interval [delay - 1, delay]
      // In this case, [8, 9].
      // See file countries_MOCKUP.csv in the test folder to corroborate the information
      const intervalData = result[delay]
      const bot = intervalData.bot;
      const [filteredBot] = bot.filter(row => {return row.time === delay + 1})
      const actual = filteredBot.Alpha_VAC_VS;
      assert.equal(actual, expected);
    });

    it(`Alpha's antiviral stockpile should increase by the order amount at the delay time + 1`, () => {
      const countries = initConditions.countries;
      const [Alpha] = countries.filter(row => {return row.Name === 'Alpha' });
      const initStock = Alpha.InitAntiviralStockpile;
      const delay = Alpha.AntiviralShipmentDelay;
      const order = 20; // See the R script
      const expected = initStock + order;
      const intervalData = result[delay]
      const bot = intervalData.bot;
      const [filteredBot] = bot.filter(row => {return row.time === delay + 1})
      const actual = filteredBot.Alpha_AVR_AVS;
      assert.equal(actual, expected);
    });

    it(`Alpha's ventilator stockpile should increase by the order amount at the delay time + 1`, () => {
      const countries = initConditions.countries;
      const [Alpha] = countries.filter(row => {return row.Name === 'Alpha' });
      const initStock = Alpha.InitVentilatorStockpile;
      const delay = Alpha.VentilatorShipmentDelay;
      const order = 5; // See the R script
      const expected = initStock + order;
      const intervalData = result[delay]
      const bot = intervalData.bot;
      const [filteredBot] = bot.filter(row => {return row.time === delay + 1})
      const actual = filteredBot.Alpha_VEN_VS;
      assert.equal(actual, expected);
    });

    it(`At time 20, Alpha's vaccine stockpile be its initial value plus the order`, () => {
      const countries = initConditions.countries;
      const [Alpha] = countries.filter(row => {return row.Name === 'Alpha' });
      const initStock = Alpha.InitVaccineStockpile;
      const order = 30; // See the R script
      const expected = initStock + order;
      const intervalData = result[19];
      const bot = intervalData.bot;
      const filteredBot = bot[bot.length - 1];
      const actual = filteredBot.Alpha_VAC_VS;
      assert.equal(actual, expected);
    });

    it(`At time 20, Alpha's antiviral stockpile be its initial value plus the order`, () => {
      const countries = initConditions.countries;
      const [Alpha] = countries.filter(row => {return row.Name === 'Alpha' });
      const initStock = Alpha.InitAntiviralStockpile;
      const order = 20; // See the R script
      const expected = initStock + order;
      const intervalData = result[19];
      const bot = intervalData.bot;
      const filteredBot = bot[bot.length - 1];
      const actual = filteredBot.Alpha_AVR_AVS;
      assert.equal(actual, expected);
    });

    it(`At time 20, Alpha's ventilator stockpile be its initial value plus the order`, () => {
      const countries = initConditions.countries;
      const [Alpha] = countries.filter(row => {return row.Name === 'Alpha' });
      const initStock = Alpha.InitVentilatorStockpile;
      const order = 5; // See the R script
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
