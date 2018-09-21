const $ = require('jquery');
import * as d3 from 'd3';
import * as utils from '../../../helpers/utilities.ts';
import * as ts from './timeseries.ts';

export const changeSelectSF = () => {
  $('#selVarSF').change(function () {
      if(d3.select('#selVarSF').datum()) {
        const currentData = d3.select('#selVarSF').datum();
        const variable = $(this).val();
        const superDataset = utils.create2DSuperset(currentData, 'time', variable);
        ts.drawTimeseriesSF(superDataset);
      }
  });
}
