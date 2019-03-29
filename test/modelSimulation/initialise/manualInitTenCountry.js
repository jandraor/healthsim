const assert = require('chai').assert;
const model = require('../../../modelSimulation/main.js');
const csvReader = require('csvtojson');
const fs = require('fs');

const testSuite = () => {
  describe('manual init', () => {
      let initialisationResult, countries;
      const filePath = "./R_Models/games/game_1/model/data/Countries.csv";
      const dirPath = './R_Models/games/game_1/model/data/';
      const countriesTemplate = `${dirPath}CountriesTemplate.csv`;
      const mockupFile = `${dirPath}countries_MOCK_UP.csv`;

      before(async function(){

        if(fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }

        if(fs.existsSync(mockupFile)) {
          fs.unlinkSync(mockupFile)
        }
        this.timeout(5000);

        const countrySetupTemplate = `${dirPath}country_MOCK_UP_TEMPLATE.csv`;
        const countrySetup = await csvReader().fromFile(countrySetupTemplate);
        //------------------------------------------------------------------------
        // Changes Beta's default value of initial vaccines
        countrySetup.forEach(row => {
          if(row.Name == 'Beta') {
            row.InitVaccineStockpile = row.Susceptible;
          }
        });
        //------------------------------------------------------------------------
        const initConditions = await csvReader().fromFile(countriesTemplate);
        const virusSeverity = 0;
        const testMode = true;
        const manualSetup = true;
        initialisationResult = await model.initialise(initConditions,
          virusSeverity, testMode, manualSetup, countrySetup);
        countries = initialisationResult.countries;
      });

      it(`should return an object`, () => {
        assert.isObject(initialisationResult)
      });

      it(`should create a file named countries.csv`, () => {
        assert(fs.existsSync(filePath)) ;
      });

      it(`should create a file named countries_MOCK_UP.csv`, () => {
        assert(fs.existsSync(mockupFile)) ;
      });

      it(`should have a 'countries' property`, () => {
        assert.property(initialisationResult, 'countries');
      })

      it(`should have a 'stocks' property`, () => {
        assert.property(initialisationResult, 'stocks');
      })

      it(`countries property should be an array`, () => {
        assert.isArray(countries)
      });

      it(`countries property should be of lenght 10`, () => {
        assert.lengthOf(countries, 10)
      } );

      it(`countries property should have specified keys in each element`, async() => {
        const expectedKeys = [
          'Name', 'Population', 'Category', 'ReportingDelay',
          'InitAntiviralStockpile', 'InitVaccineStockpile', 'InitVentilatorStockpile',
          'InitialFinancialResources', 'AntiviralCostPerUnit', 'VaccineCostPerUnit',
          'VentilatorCostPerUnit', 'Infected'];

        const validationResult = countries.map(row => {
          const keys = Object.keys(row);
          const rowValidation = expectedKeys.reduce((accumulator, currentValue) => {
            const search = keys.indexOf(currentValue);
            const validation = search > -1 ? true : false;
            return accumulator && validation;
          }, true);
          return rowValidation
        });
        const expectedResult = Array(10).fill(true);
        assert.deepEqual(validationResult, expectedResult);
      });

      it(`Beta init vaccine stockpile should be 10000`, () => {
        const [betaObject] = countries.filter(row => {
          return row.Name === 'Beta'
        });
        const actual = betaObject.InitVaccineStockpile;
        const expected = 10000;
        assert.equal(actual, expected);
      });
    });
}

module.exports = testSuite;
