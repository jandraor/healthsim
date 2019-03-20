const assert = require('chai').assert;

//single country model
describe('run a simulation step', () => {
  // beforeEach(() => {
  //   //initialise model
  // });
  const runRScriptAsync = require('../helpers/R.js');
  const params = ['R_Models/games/game_1/srv_run.R', 0, 1];

  it(`the result should be an array`, async function() {
    this.timeout(5000);
    const simulationResult = await runRScriptAsync(params);
    assert.isArray(simulationResult.bot)
  })

  //it(`the result should `)

  it(`transmission stocks should be equal to Vensim's transmission stocks`, async function() {
    this.timeout(5000);
    const simulationResult = await runRScriptAsync(params);
    const vensimOutput = {'x': 3}
    assert.deepEqual(simulationResult.bot, vensimOutput)
  })
})
