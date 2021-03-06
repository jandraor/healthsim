const assert = require('chai').assert;
const fs = require('fs');
const model = require('../../../../../modelSimulation/main.js');
const csvReader = require('csvtojson');
const nonNegativeTests = require("../../commonTests/nonNegativeStocks.js");
const basicTests = require("../../commonTests/basic.js");

const test = () => {
  describe('resource deployment', () => {
    const startTime = 0;
    const stopTime = 1;
    const dirPath = './R_Models/games/game_1/model/data/';
    let result, nTeams, teams, alphaUsageFraction;

    before(async function()  {
      this.timeout(10000);
      const initModel = require('./helpers/main.js');
      const manualValues = [{
        'team': 'Beta',
        'var': 'InitVaccineStockpile',
        'value': 10000
      }]
      const initModeloutput = await initModel('manual', manualValues);
      const initialisationResult = initModeloutput.initialisationResult;
      this.teams = initModeloutput.teams;
      //========================================================================
      // PolicyMatrix
      //========================================================================
      const policyMatrixTemplate = `${dirPath}10CountryPolicyMatrixTemplate.csv`;
      const policyMatrix = await csvReader().fromFile(policyMatrixTemplate);

      //Alpha attemps to deploy all its antivirals
      alphaUsageFraction = 1;

      policyMatrix.forEach((row, i) => {
        if(i === 0){
          row.AntiviralsUsageFraction = alphaUsageFraction;
        }
      });

      betaUsageFraction = 1;
      // Beta attemps to vaccinate all its individuals
      policyMatrix.forEach((row, i) => {
        if(i === 1){
          row.VaccineUsageFraction = betaUsageFraction;
        }
      });

      //========================================================================
      // Donations
      //========================================================================
      const donationsTemplate = `${dirPath}10CountryDonationsTemplate.csv`;
      const donationsInput = await csvReader().fromFile(donationsTemplate);
      //STEP 0.05
      result = await model.run(startTime, stopTime, policyMatrix, donationsInput);
      this.result =  result;
      nTeams = 10;
    });

    basicTests();
    nonNegativeTests.transmissionSector();
    nonNegativeTests.financialSector();
    nonNegativeTests.vaccineSector();
    nonNegativeTests.antiviralSector();
    nonNegativeTests.ventilatorSector();

    // --------------------------------------------------------------------------
    // Donations

    const resources = ['Antivirals', 'Vaccines', 'Ventilators', 'Financial'];

    resources.forEach(resource => {
      it(`The sum of all rows in ${resource} donations should be nil`, () => {
        const resourceDonations = result.donations[resource];

        const actual = resourceDonations.map(row => {
          const rowSum = row.reduce((lastVal, curVal) => {
            return lastVal + curVal;
          }, 0)
          return rowSum
        }).reduce((lastVal, curVal) => {
          return lastVal + curVal;
        }, 0);

        const expected = 0;

        assert.equal(actual, expected)
      });
    });
  });
}

module.exports = test;
