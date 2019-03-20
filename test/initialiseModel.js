const assert = require('chai').assert;
const model = require('../modelSimulation/main.js');

describe('initialise 10-country model', function() {
  let initConditions, initialisationResult;
  const filePath = "./R_Models/games/game_1/model/data/Countries.csv";
  const fs = require('fs');

  before(async function(){
    if(fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
    this.timeout(5000);
    const csvReader = require('csvtojson');
    const countriesTemplate = './R_Models/games/game_1/model/data/CountriesTemplate.csv';
    initConditions = await csvReader().fromFile(countriesTemplate);
    const virusSeverity = 0;
    initialisationResult = await model.initialise(initConditions, virusSeverity);
  });

  it(`should create a file named countries.csv`, () => {
    assert(fs.existsSync(filePath)) ;
  });

  it(`should return an array`, () => {
    assert.isArray(initialisationResult)
  });

  it(`should return an array of 10 objects`, () => {
    assert.lengthOf(initialisationResult, 10)
  } );

  it(`should return an array with specified keys in each element`, async() => {
    const expectedKeys = [
      'Name', 'Population', 'Category', 'ReportingDelay',
      'InitAntiviralStockpile', 'InitVaccineStockpile', 'InitVentilatorStockpile',
      'InitialFinancialResources', 'AntiviralCostPerUnit', 'VaccineCostPerUnit',
      'VentilatorCostPerUnit', 'Infected'];

    const validationResult = initialisationResult.map(row => {
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
});
