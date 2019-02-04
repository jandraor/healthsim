import * as select from '../../../components/select.ts';
const $ = require('jquery');
import * as chord from './chordDiagram.ts';

export const build = () => {
  const divId = "divSelRes";
  select.buildGroup(divId);
  onChange();
}

const onChange = () => {
  $(`#selRelRes`).change(function() {
    const donations = $(this).data('data');
    const labels = donations.names_order;
    const resource = $(this).val();
    chord.update(donations[resource], labels);
  });
}
