import * as heatmap from './heatmap.ts';
import * as chord from './chordDiagram.ts';
import * as select from './select.ts';
const $ = require('jquery');
import * as ut from '../../../../helpers/utilities.ts';

export const build = options => {
  heatmap.build(options);
  select.build();
  chord.build();
}

export const update = resultObj => {
  $('#selRelRes').data('data', resultObj.donations);
  heatmap.update(resultObj.bot);
  const resource = $('#selRelRes').val();
  const donations = resultObj.donations;
  const totalDonations = ut.sumMatrix(donations[resource]);
  if(totalDonations === 0){
    chord.empty();
    $('#lTotalDonations').text(0);
    return
  }
  $('#lTotalDonations').text(totalDonations);
  chord.update(donations[resource], donations.names_order);
}
