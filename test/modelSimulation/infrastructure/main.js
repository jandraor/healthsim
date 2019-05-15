const assert = require('chai').assert;

const infrastructure = describe('infrastructure', () => {
  it(`should have the require R libraries installed`, async() => {
    const runRScriptAsync = require('../../../helpers/R.js');
    const scriptPath = 'R_Models/games/game_1/tests/infrastructure/libraries.R'
    const params = [scriptPath];
    const result = await runRScriptAsync(params);
    console.log('result===============');
    console.log(result)
    console.log('result===============');
    const validation = result.validation;
    const actual = validation;
    const expected = 1;
    assert.equal(actual, expected, validation.missing)

  })
})

module.exports = () => {
  infrastructure();
}
