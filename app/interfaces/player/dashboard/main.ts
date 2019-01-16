import * as timeseries from './timeseries.ts'
import * as selects from './selects.ts'
import * as sparklines from './sparklines.ts'

export const build = (initParams) => {
  const tsParams = {
    'rounds': 10,
  }
  timeseries.buildCharts(tsParams);
  selects.build();
  sparklines.build(initParams);
}
