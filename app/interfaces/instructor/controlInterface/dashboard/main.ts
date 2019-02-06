import * as heatmap from './heatmap.ts';
import * as chord from './chordDiagram.ts';
import * as select from './select.ts';
const $ = require('jquery');
import * as ut from '../../../../helpers/utilities.ts';

export const build = options => {
  heatmap.build(options);
  select.build();
}

export const update = resultObj => {
  $('#selRelRes').data('data', resultObj.donations);
  heatmap.update(resultObj.bot);
  const resource = $('#selRelRes').val();
  const donations = resultObj.donations;
  console.log('matrix');
  console.log(donations[resource])
  const totalDonations = ut.sumMatrix(donations[resource]);
  $('#lTotalDonations').text(totalDonations);
  chord.update(donations[resource], donations.names_order);
}
