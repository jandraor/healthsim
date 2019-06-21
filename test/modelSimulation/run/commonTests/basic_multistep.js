'use strict';
const fs = require('fs');
const assert = require('chai').assert;
const isSquareMatrix = require('../../../helpers.js');

module.exports = function() {

  it(`should return an array`, function() {
    const result = this.result;
    assert.isArray(result);
  });

  it(`every object should have a 'bot' property`, function() {
    const result = this.result;
    result.forEach(obj => {
      assert.property(obj, 'bot');
    })
  });

  it(`every 'bot' property should be an array`, function() {
    const result = this.result;
    result.forEach(obj => {
      assert.isArray(obj.bot);
    });
  });

  it(`In every bot property, each element should be an object`, function() {
    const result = this.result;

    result.forEach(obj => {
      const bot = obj.bot;
      const rowValidation = bot.map((row, i) => {
        assert.isObject(row, `row ${i + 1} is not an object`)
      });
    });
  });

  it(`All rows should have identical column names`, function() {
    const result = this.result;
    const pivotKeys = Object.keys(result[0].bot[0]);

    result.forEach(obj => {
      const bot = obj.bot
      bot.map(row => {
        const actual = pivotKeys
        const expected = Object.keys(row)
        assert.deepEqual(actual, expected, `Column names different in time: ${row.time} `)
      });
    })
  });

  const variables = ['_TotalInfected', '_TotalPopulation', '_TM_I1', '_TM_I2',
    '_TM_IS', '_TM_IQ', '_TM_IAV', '_FM_R', '_AVR_AVS', '_VAC_VS', '_VEN_VS'];

  variables.forEach(function(variable) {
    it(`In every bot property, each object should have the variable "${variable}" for each team`, function() {
      const teams = this.teams;
      const result = this.result;
      result.forEach(obj => {
        const bot = obj.bot;
        const row = bot[0];
        teams.map(team => {
          const expected = `${team}${variable}`
          assert.property(row, expected, `${expected} not found`);
        });
      })
    });
  });

  it(`Every object should have a 'donations' property`, function() {
    const result = this.result;
    result.forEach(obj => {
      assert.property(obj, 'donations');
    })
  });

  it(`Every 'donations' property should be an object`, function() {
    const result = this.result;
    result.forEach(obj => {
      assert.isObject(obj.donations);
    })
  });

  const resources = ['Antivirals', 'Vaccines', 'Ventilators', 'Financial'];

  resources.forEach(resource => {
    it(`Every 'donations' property should have a '${resource}' property`, function() {
      const result = this.result;
      result.forEach(obj => {
        assert.property(obj.donations, resource)
      })
    });

    it(`Every '${resource}' property should be an array`, function() {
      const result = this.result;
      result.forEach(obj => {
        assert.isArray(obj.donations[resource])
      })
    });

    it(`Every ${resource} property should be a square matrix`, function() {
      const result = this.result;
      result.forEach(obj => {
        const squareMatrix = isSquareMatrix(obj.donations[resource]);
        assert(squareMatrix);
      })
    });

    it(`In every ${resource}, the square matrix order should be equal to the number of teams`, function() {
      const result = this.result;
      const teams = this.teams;
      result.forEach(obj => {
        const resourceDonations = obj.donations[resource];
        const actual = resourceDonations.length;
        const expected = teams.length;
        assert.equal(actual, expected);
      })
    });

    it(`In every ${resource} property, the square matrix diagonal should be 0`, function() {
      const result = this.result;
      result.forEach(obj => {
        const resourceDonations = obj.donations[resource];

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

    });
  });

  it(`Every 'donations' property should have a 'names_order' property`, function() {
    const result = this.result;
    result.forEach(obj => {
      assert.property(obj.donations, 'names_order')
    })
  });

  it(`Every "names_order" property should be an array`, function() {
    const result = this.result;

    result.forEach(obj => {
      assert.isArray(obj.donations.names_order)
    });
  });

  it(`The length of every "names_order" property should be equal to the number of teams`, function() {
    const result = this.result;
    const teams = this.teams;
    const nTeams = teams.length;

    result.forEach(obj => {
      const actual = obj.donations.names_order.length;
      const expected = nTeams;
      assert.equal(actual, expected);
    });
  });
}
