'use strict';
const fs = require('fs');
const assert = require('chai').assert;
const isSquareMatrix = require('../../../helpers.js');

module.exports = function() {

  it(`should create a file named PolicyMatrix.csv`, function() {
    const policyMatrixPath = "./R_Models/games/game_1/model/data/PolicyMatrix.csv";
    assert(fs.existsSync(policyMatrixPath)) ;
  });

  it(`should create a file named donations.csv`, function() {
    const donationsPath = "./R_Models/games/game_1/model/data/donations.csv";
    assert(fs.existsSync(donationsPath)) ;
  });

  it(`should return an object`, function() {
    const result = this.result;
    assert.isObject(result);
  });

  it(`should have a 'bot' property`, function() {
    const result = this.result;
    assert.property(result, 'bot');
  });

  let botIsArray = false;
  let allRowsAreObject = false;
  let equalColNames = false;

  it(`'bot' property should be an array`, function() {
    const result = this.result;
    botIsArray = Array.isArray(result.bot);
    assert.isArray(result.bot);
  });

  it(`In bot property, each element should be an object`, function() {
    if(botIsArray === false) {
      assert(false, 'bot property is not an array')
    }
    const result = this.result;
    const bot = result.bot;
    const rowValidation = bot.map((row, i) => {
      assert.isObject(row, `row ${i + 1} is not an object`)
    });
    allRowsAreObject = true;
  });

  it(`In bot property, all rows should have identical column names`, function() {
    if(allRowsAreObject === false) {
      assert(false, 'Not all rows in bot are objects')
    }
    const result = this.result;
    const bot = result.bot;
    const pivotKeys = Object.keys(bot[0]);
    bot.map(row => {
      const actual = pivotKeys
      const expected = Object.keys(row)
      assert.deepEqual(actual, expected, "Column names different in rows")
    });
    equalColNames = true
  });

  const variables = ['_TotalInfected', '_TotalPopulation', '_TM_I1', '_TM_I2',
    '_TM_IS', '_TM_IQ', '_TM_IAV', '_FM_R', '_AVR_AVS', '_VAC_VS', '_VEN_VS'];

  variables.forEach(function(variable) {
    it(`In bot property, each object should have the variable "${variable}" for each team`, function() {

      if(botIsArray === false) {
        assert(false, 'bot property is not an array')
      }

      if(allRowsAreObject === false) {
        assert(false, 'Not all rows in bot are objects')
      }

      if(equalColNames === false) {
        assert(false, 'rows have different col names')
      }

      //Since the previous test case proves that all rows have identical column names,
      //testing on only one row is sufficient for the current test case.
      const teams = this.teams;
      const result = this.result;
      const bot = result.bot
      const row = bot[0];
      teams.map(team => {
        const expected = `${team}${variable}`
        assert.property(row, expected, `${expected} not found`);
      });
    });
  });

  it(`should have a 'donations' property`, function() {
    const result = this.result;
    assert.property(result, 'donations');
  });

  it(`'donations' property should be an object`, function() {
    const result = this.result;
    assert.isObject(result.donations);
  });

  const resources = ['Antivirals', 'Vaccines', 'Ventilators', 'Financial'];

  resources.forEach(resource => {
    it(`'donations' property should have a '${resource}' property`, function() {
      const result = this.result;
      assert.property(result.donations, resource)
    });

    it(`'${resource}' property should be an array`, function() {
      const result = this.result;
      assert.isArray(result.donations[resource])
    });

    let squareMatrix = false;
    it(`${resource} property should be a square matrix`, function() {
      const result = this.result;
      squareMatrix = isSquareMatrix(result.donations[resource]);
      assert(squareMatrix);
    });

    it(`In ${resource},the square matrix order should be equal to the number of teams`, function() {
      const result = this.result;
      const teams = this.teams;
      const resourceDonations = result.donations[resource];
      if(squareMatrix === false) {
        assert(false, "It is not a square matrix");
      }
      const actual = resourceDonations.length;
      const expected = teams.length;
      assert.equal(actual, expected);
    });

    it(`In ${resource}, the square matrix diagonal should be 0`, function() {
      const result = this.result;
      const resourceDonations = result.donations[resource];
      if(squareMatrix === false) {
        assert(false, "It is not a square matrix");
      }
      const diagonal = resourceDonations.map((row, i) => {
        return row[i]
      });
      const sum = diagonal.reduce((lastValue, currentValue) => {
        return lastValue + Math.pow(currentValue, 2)
      }, 0)

      const expected = 0;
      const actual = sum;
      assert.strictEqual(actual,expected)
    });


    // //--------------------------------------------------------------------------

    //

    //

    //
    // it(`The sum of ${resource} donations in the csv file should match the sum
    //   returned by the model`, function() {
    //
    //   if(isSquareMatrix === false) {
    //     assert(false, "It is not a square matrix");
    //   }
    //   const result = this.result;
    //   const resourceDonations = result.donations[resource];
    //   const filteringResult = donationCases.filter(donationCase => {
    //     return donationCase.resource === resource;
    //   });
    //   const donationCase = filteringResult[0]
    //   const expected = donationCase.donations.map(donation => {
    //     return donation.amount
    //   }).reduce((lastVal, curVal) => {return lastVal + curVal}, 0) ;
    //   const recipient = donationCase.recipient;
    //   const namesOrder = result.donations.names_order
    //   const index = namesOrder.indexOf(recipient);
    //   const actual = resourceDonations[index]
    //     .reduce((lastVal, curVal) => {return lastVal + curVal}, 0)
    //   assert.equal(actual, expected);
    // });
  });

  it(`'donations' property should have a 'names_order' property`, function() {
    const result = this.result;
    assert.property(result.donations, 'names_order')
  });

  it(`"names_order" property should be an array`, function() {
    const result = this.result;
    assert.isArray(result.donations.names_order)
  });

  it(`The length of "names_order" should be equal to the number of teams`, function() {
    const result = this.result;
    const teams = this.teams;
    const nTeams = teams.length;
    const actual = result.donations.names_order.length;
    const expected = nTeams;
    assert.equal(actual, expected)
  })
}
