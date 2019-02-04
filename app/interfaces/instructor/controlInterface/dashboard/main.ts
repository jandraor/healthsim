import * as heatmap from './heatmap.ts';
import * as chord from './chordDiagram.ts';
import * as select from './select.ts';
const $ = require('jquery');

export const build = options => {
  heatmap.build(options);
  select.build();
}

export const update = resultObj => {
  $('#selRelRes').data('data', resultObj.donations);
  heatmap.update(resultObj.bot);
  const resource = $('#selRelRes').val();
  const donations = resultObj.donations
  chord.update(donations[resource], donations.names_order);
}
