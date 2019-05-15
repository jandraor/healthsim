const assert = require('chai').assert;

const infrastructure = describe('infrastructure', () => {
  it(`should have the require R libraries installed`, async function() {
    this.timeout(5000)
    const runRScriptAsync = require('../../../helpers/R.js');
    const scriptPath = 'R_Models/games/game_1/tests/infrastructure/libraries.R'
    const params = [scriptPath];
    const result = await runRScriptAsync(params);
    const validation = result.validation;
    const actual = validation;
    const expected = 1;
    assert.equal(actual, expected, `${result.missing} package(s) missing`)
  })
})

module.exports = () => {
  infrastructure();
}
