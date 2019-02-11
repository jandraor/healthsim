import * as select from "../../components/select.ts"
import * as d3 from 'd3';
const $ = require('jquery');


export const build = () => {
  const items = [
    {'value': 'sSusceptible', 'text': 'Susceptible'},
    {'value': 'sInfected', 'text': 'Infected'},
    {'value': 'sRecovered', 'text': 'Recovered'},
    {'value': 'IR', 'text': 'Infection rate'},
    {'value': 'RR', 'text': 'Recovery rate'}
  ]

  const params = {
    'items': items,
    'selectId': 'selVarSF',
  }
  select.addOptions(params);
  select.buildGroup('divTSSF');
  select.buildGroup('infoLoopDominance');
}

export const reset = () => {
  d3.select('#selVarSF').datum(null);
  $('#selVarSF')
    .prop('disabled', false)
    .selectpicker('val', 'sSusceptible')
    .selectpicker('refresh');

  $('#selLoopDominance')
    .prop('disabled', false)
    .selectpicker('val', 'sSusceptible')
    .selectpicker('refresh');
}
