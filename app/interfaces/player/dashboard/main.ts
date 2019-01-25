import * as timeseries from './timeseries.ts';
import * as selects from './selects.ts';
import * as sparklines from './sparklines.ts';
const $ = require('jquery');

export const build = initParams => {
  const stopTime = initParams.rounds;
  timeseries.buildCharts(stopTime);
  selects.build();
  sparklines.build(initParams);
}

export const update = simulationResult => {
  $('#lTeamId').data('data', simulationResult);
  sparklines.draw(simulationResult);
  timeseries.drawAll(simulationResult);
}
