'use strict';
const assert = require('chai').assert;
const fs = require('fs');
const model = require('../../../../../../modelSimulation/main.js');
const csvReader = require('csvtojson');
const nonNegativeTests = require("../../../commonTests/nonNegativeStocks.js");
const basicTests = require("../../../commonTests/basic.js");
const writeCsv = require('../../../../../../helpers/csvFiles.js');

/**
* Test case description: The main purpose of this test is to check whether
* after a donation, the total number of resources changes when spoilage rates
* are 0. The expected result is that such a number should not change. To test
* with zero spoilage rates, the model is initialised manually with a template.
 */

const donManualInit = () => {
  describe('constant resources when there are no spoilages', () => {
    let result, nTeams, teams, donationCases;

    before(async function()  {
      this.timeout(10000);
      const initModel = require('../helpers/main.js');
      // In manual init spoilage fraction for all teams is 0
      const initModeloutput = await initModel('manual');
      const initialisationResult = initModeloutput.initialisationResult;
      teams = initModeloutput.teams
      this.teams = teams;

      const startTime = 0;
      const stopTime = 1;
      const policyMatrixTemplate = "./R_Models/games/game_1/model/data/10CountryPolicyMatrixTemplate.csv";
      const policyMatrix = await csvReader().fromFile(policyMatrixTemplate);

      //========================================================================
      // Donations
      //========================================================================
      const donationsTemplate = "./R_Models/games/game_1/model/data/10CountryDonationsTemplate.csv";
      const donationsInput = await csvReader().fromFile(donationsTemplate);

      donationCases = [
        {
          'resource': 'Antivirals',
          'donations': [
            {'donor': 'Alpha', 'amount': 50},
            {'donor': 'Gamma', 'amount': 20},
            {'donor': 'Theta', 'amount': 10},
          ],
          'recipient': 'Kappa'
        },
        {
          'resource': 'Vaccines',
          'donations': [
            {'donor': 'Theta', 'amount': 15},
            {'donor': 'Alpha', 'amount': 10},
            {'donor': 'Gamma', 'amount': 5},
          ],
          'recipient': 'Epsilon'
        },
        {
          'resource': 'Ventilators',
          'donations': [
            {'donor': 'Epsilon', 'amount': 3},
            {'donor': 'Theta', 'amount': 4},
            {'donor': 'Alpha', 'amount': 5},
          ],
          'recipient': 'Beta'
        },
        {
          'resource': 'Financial',
          'donations': [
            {'donor': 'Delta', 'amount': 15},
            {'donor': 'Alpha', 'amount': 20},
            {'donor': 'Kappa', 'amount': 25},
          ],
          'recipient': 'Iota'
        },
      ]
      donationCases.forEach(donationCase => {
        const resource = donationCase.resource;
        donationCase.donations.forEach(donation => {
          donationsInput.forEach(row => {
            if(row.from === donation.donor && row.to === donationCase.recipient
              && row.resource === resource){
                row.amount = donation.amount;
            }
          });
        });
      });
      //------------------------------------------------------------------------
      result = await model.run(startTime, stopTime, policyMatrix, donationsInput);
      this.result =  result;
      nTeams = 10;
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
      {
        'name': 'Financial',
        'stock': '_FM_R'
      }
    ]

    resources.forEach(resource => {
      it(`The sum of ${resource.name} donations in the csv file should match the sum
        returned by the model`, () => {

        const resourceDonations = result.donations[resource.name];
        const filteringResult = donationCases.filter(donationCase => {
          return donationCase.resource === resource.name;
        });
        const donationCase = filteringResult[0]
        const expected = donationCase.donations.map(donation => {
          return donation.amount
        }).reduce((lastVal, curVal) => {return lastVal + curVal}, 0) ;
        const recipient = donationCase.recipient;
        const namesOrder = result.donations.names_order
        const index = namesOrder.indexOf(recipient);
        const actual = resourceDonations[index]
          .reduce((lastVal, curVal) => {return lastVal + curVal}, 0)
        assert.equal(actual, expected);
      });

      it(`The total number of ${resource.name} in the game should be constant after donations`,
        () => {
          const bot = result.bot;
          const firstRow = bot[0]; // time === 0
          const lastRow = bot[bot.length - 1]; // time === 1
          const stockVars = teams.map(team => {return `${team}${resource.stock}`});

          const actual = stockVars.map(stockVar => {
            return firstRow[stockVar]
          }).reduce((lastVal, curVal) => {return lastVal + curVal}, 0);



          const expected = stockVars.map(stockVar => {
            return lastRow[stockVar]
          }).reduce((lastVal, curVal) => {return lastVal + curVal}, 0);

          assert.equal(actual, expected)
        })
    });

    nonNegativeTests.transmissionSector();
    nonNegativeTests.financialSector();
    nonNegativeTests.vaccineSector();
    nonNegativeTests.antiviralSector();
    nonNegativeTests.ventilatorSector();
  });
}

module.exports = donManualInit;
