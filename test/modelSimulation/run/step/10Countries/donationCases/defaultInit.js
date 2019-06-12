'use strict';
const assert = require('chai').assert;
const fs = require('fs');
const model = require('../../../../../../modelSimulation/main.js');
const csvReader = require('csvtojson');
const nonNegativeTests = require("../../../commonTests/nonNegativeStocks.js");
const basicTests = require("../../../commonTests/basic.js");

const donDefaultInit = () => {
  describe('default model init', () => {
    let result, nTeams, teams, donationCases;

    before(async function()  {
      this.timeout(10000);
      const initModel = require('../helpers/main.js');
      const initModeloutput = await initModel('default');
      const initialisationResult = initModeloutput.initialisationResult;
      this.teams = initModeloutput.teams;

      const startTime = 0;
      const stopTime = 1;
      const policyMatrixTemplate = "./R_Models/games/game_1/model/data/10CountryPolicyMatrixTemplate.csv";
      const policyMatrix = await csvReader().fromFile(policyMatrixTemplate);
      //zeta is going to spend all its resources in Vaccines
      const [zetaObj] = initialisationResult.countries.filter(teamObj => {
        return teamObj.Name === "Zeta";
      })
      const zetaFinRes = zetaObj.InitialFinancialResources //financial resources;
      const vaccinesUnitCost = zetaObj.VaccineCostPerUnit;
      const maxVac = Math.floor(zetaFinRes / vaccinesUnitCost);
      policyMatrix.forEach((row, i) => {
        if(i === 5){
          row.VaccinesOrdered = maxVac;
        }
      })
      //========================================================================
      // Donations
      //========================================================================
      const donationsTemplate = "./R_Models/games/game_1/model/data/10CountryDonationsTemplate.csv";
      const donationsInput = await csvReader().fromFile(donationsTemplate);

      // Donation test cases
      // NB: Zeta is neither a donor nor a recipient
      //------------------------------------------------------------------------
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

    const resources = ['Antivirals', 'Vaccines', 'Ventilators', 'Financial'];

    resources.forEach(resource => {
      it(`The sum of ${resource} donations in the csv file should match the sum
        returned by the model`, () => {

        const resourceDonations = result.donations[resource];
        const filteringResult = donationCases.filter(donationCase => {
          return donationCase.resource === resource;
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
    });

    //Another test case could be maxVac - 10, result should be above 0
    it(`Zeta financial stock should be zero`, () => {
      const bot = result.bot;
      const lastRow = bot[bot.length - 1]
      const actual = lastRow.Zeta_FM_R;
      const expected = 0;
      assert.equal(actual, expected)
    });

    nonNegativeTests.transmissionSector();
    nonNegativeTests.financialSector();
    nonNegativeTests.vaccineSector();
    nonNegativeTests.antiviralSector();
    nonNegativeTests.ventilatorSector();
  });
}

module.exports = donDefaultInit;
