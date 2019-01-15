import * as timeseries from './timeseries.ts'
import * as selects from './selects.ts'
import * as sparklines from './sparklines.ts'

export const build = () => {
  const params = {
    'rounds': 10,
  }
  timeseries.buildCharts(params);
  selects.build();
  sparklines.build();
}
