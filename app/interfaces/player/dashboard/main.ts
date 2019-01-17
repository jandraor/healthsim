import * as timeseries from './timeseries.ts';
import * as selects from './selects.ts';
import * as sparklines from './sparklines.ts';
const $ = require('jquery');

export const build = initParams => {
  const tsParams = {
    'rounds': 20,
  }
  timeseries.buildCharts(tsParams);
  selects.build();
  sparklines.build(initParams);
}

export const update = simulationResult => {
  sparklines.draw(simulationResult);
}
