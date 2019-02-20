const $ = require('jquery');
import * as d3 from 'd3';
import * as intUt from "../../../components/utilities.ts";
import * as tsline from "../../../components/tsLine.ts";
import * as sl from "../../../components/sparkline.ts";
import * as tables from "../../../components/table.ts";
import * as slBuilder from "../sparklines.ts";
import * as ts from '../timeseries.ts';
import * as sfd from "../sf.ts";
import * as ut from '../../../../helpers/utilities.ts';

export const onClick = model_id  => {
  const w = 800 * (2 / 3); //Width
  const h = 500 * (2 / 3); //Heigth
  const padding = 40;

  d3.select("#bRun")
    .on("click", async() => {
      $('#bRun').html('<i class="fa fa-spinner fa-spin"></i>')
      const startTime = parseInt($("#varValueFrom").text());
      const finishTime = parseInt($("#varValueTo").text());
      const params = intUt.getParameters(String(model_id), false,
      startTime, finishTime);
      const paramsUrl = intUt.concatenateParameters(params);
      const url = `/simulate/model/${model_id}/${paramsUrl}`;
      const rawDataset = await ut.fetchJSON(url);
      if($.isEmptyObject(rawDataset)){
        ut.showAlert('Simulation could not be executed');
        $('#bRun').html('Run');
        return
      }
      $('#bRun').html('Run')
      const dataset = intUt.parseDataset(rawDataset, String(model_id));
      const lastElement = dataset[dataset.length - 1];
      const newCurrentTime = String(d3.max(dataset, d => {return d.time}));
      const selSF = d3.select('#selVarSF');
      if($('#cbComparative').is(":checked") && selSF.datum()){
        const currentData = selSF.datum();
        currentData.push(dataset);
        selSF.datum(currentData);
      } else {
        selSF.datum([dataset]);
      }
      //Draw timeseries in the stock and flow chart
      const currentSelectedVar = $(`#selVarSF`).val();
      const currentVarDisplay = $('#selVarSF option:selected').text();
      let x = dataset.map(d => d.time);
      let y = dataset.map(d => d[currentSelectedVar]);
      let length = x.length;

      let twoDimensionDataset = [];
      for (let i = 0; i < length; i++) {
        let temp = {
          'x' : x[i],
          'y' : y[i]
        };
        twoDimensionDataset.push(temp);
      }

      let currentDatasets = [];
      let tsDataset = [];
      if($('#cbComparative').is(":checked")){
        currentDatasets = d3.selectAll('.tsSF').data();
        currentDatasets.forEach(dataset => {
          tsDataset.push(dataset);
        });
      }
      tsDataset.push(twoDimensionDataset)
      ts.drawTimeseriesSF(tsDataset);
      //Draw timeseries in the parameter chart
      x = dataset.map(d => d.time);
      y = dataset.map(d => d.netReproductionNumber);
      length = x.length;

      twoDimensionDataset = [];
      for (let i = 0; i < length; i++) {
        let temp = {
          'x' : x[i],
          'y' : y[i]
        };
        twoDimensionDataset.push(temp);
      }

      currentDatasets = [];
      tsDataset = [];
      if($('#cbComparative').is(":checked")){
        currentDatasets = d3.selectAll('.tsPar').data();
        currentDatasets.forEach(dataset => {
          tsDataset.push(dataset);
        });
      }

      d3.selectAll('.tsPar').remove();

      tsDataset.push(twoDimensionDataset)

      const options = {
        'superDataset': tsDataset,
        'svgId': "svgTSPar",
        'padding': padding,
        'finishTime': finishTime,
        'lineDuration': 2000,
        'idLine': 'parLine',
        'classLine': 'tsLine tsPar',
        'tooltip': true,
      }
      tsline.drawLine(options);
      //Sparklines
      slBuilder.buildSparklines(dataset, finishTime, padding, w, h);
      //Update stock & flow
      sfd.update(lastElement, 2000);
      $('#bReplay').prop('disabled', false);


      $('#varValueCurTim').text(newCurrentTime);
      //Put the recent simulation parameters in the current simulations tab
      const totalPop = parseInt(params.S) + parseInt(params.I) +
        parseInt(params.R);
      const paramsTbl = {
        'modelId': model_id,
        'tableId': 'tblCurrentSim',
        'rowElements': {
          'Population': totalPop,
          'Initial_infected': params.I,
          'Infectivity': params.ift,
          'Contact_rate': params.cr,
          'Time_to_recover': params.rd,
          'startTime': params.startTime,
          'stopTime': params.stopTime
        }
      }
      tables.addRowCurrentSim(paramsTbl);
    });
}
