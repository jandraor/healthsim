import * as select from '../../../components/select.ts';
const $ = require('jquery');
import * as chord from './chordDiagram.ts';
import * as barchart from './barchart.ts'
import * as ut from '../../../../helpers/utilities.ts';
import * as heatmap from './heatmap.ts';
import * as instData from '../../data.ts';
import * as timeseries from './timeseries.ts';

export const build = () => {
  const divIds = ["divSelRes", 'divSelEpi', 'divSelInv'];
  divIds.forEach(id => {
    select.buildGroup(id);
  });
  onChangeSelDon();
  onChangeSelEpi();
  onChangeSelInv();
}

const onChangeSelDon = () => {
  $(`#selRelRes`).change(function() {
    const donations = $(this).data('data');
    if($.isEmptyObject(donations)){
      return
    }
    const labels = donations.names_order;
    const resource = $(this).val();
    const totalDonations = ut.sumMatrix(donations[resource]);
    if(totalDonations === 0){
      chord.empty();
      barchart.empty();
      $('#lTotalDonations').text(0);
      return
    }
    $('#lTotalDonations').text(totalDonations);
    chord.update(donations[resource], labels);
    barchart.update(donations[resource], labels);
  });
}

const onChangeSelEpi = () => {
  $(`#selEpiVar`).change(function() {
    const variable = $(this).val();
    const currentData = $(this).data('results');
    heatmap.update(currentData, variable, 'Epi');
    timeseries.update(currentData, variable, 'Epi');
  });
}

const onChangeSelInv = () => {
  $(`#selInvVar`).change(function() {
    const variable = $(this).val();
    //Select 'selEpiVar' is the only select that contains data
    const currentData = $(`#selEpiVar`).data('results');
    heatmap.update(currentData, variable, 'Inv');
    timeseries.update(currentData, variable, 'Inv');
  });
}
