const $ = require('jquery');
import * as d3 from 'd3';
import * as ut from "../../../../components/utilities.ts";
import * as tsline from "../../../../components/tsLine.ts";
import * as sl from "../../../../components/sparkline.ts";
import * as saf from "../../../../components/stocksandflows.ts";
import * as cld from "../../../../components/cld.ts";
import * as slBuilder from "../../sparklines.ts";

export const build = (model_id, fetchJSON) => {
  const w = 800 * (2 / 3); //Width
  const h = 500 * (2 / 3); //Heigth
  const padding = 40;

  d3.select('#bStep')
    .on("click", async() => {
      $('#slInfected').slider('disable');
      let currentTime =  parseInt($('#varValueCurTim').text());
      const maxTime = parseInt($('#varValueTo').text());
      const minTime = parseInt($('#varValueFrom').text());
      const currentMode = $('#varValueMode').text().trim();
      // Reset time
      if(currentTime === maxTime) {
        $('#varValueCurTim').text('0');
        currentTime = 0;
        //initialiseStockAndFlow();
      }

      if(currentTime === minTime){
        d3.selectAll(".sparkline").remove();
        d3.selectAll('.sparkcircle').remove();
        if(!$('#cbComparative').is(":checked")){
          d3.selectAll(".tsLine").remove();
        }
      }

      // Generate new data
      const startTime = parseInt($('#varValueCurTim').text());
      const finishTime = startTime + 1;
      const params = ut.getParameters(String(model_id), true, startTime, finishTime);
      const paramsUrl = ut.concatenateParameters(params);
      const url = `/simulate/model/${model_id}/${paramsUrl}`;
      const rawDataset = await fetchJSON(url);
      const newDataset = ut.parseDataset(rawDataset, String(model_id));
      const selSF = d3.select('#selVarSF');
      if($('#cbComparative').is(":checked")){
        if(!selSF.datum()){
          selSF.datum([newDataset]);
        } else {
          if(startTime === 0) {
            const currentData = selSF.datum();
            currentData.push(newDataset);
            selSF.datum(currentData);
          } else {
            const currentData = selSF.datum();
            const length = currentData.length;
            const lastElement = currentData[length - 1];
            for(let i = 1; i < newDataset.length; i++) {
              lastElement.push(newDataset[i]);
              currentData[length - 1] = lastElement;
              selSF.datum(currentData);
            }
          }
        }
      } else { //if checkbox is not ticked
        if(!selSF.datum() || startTime === 0){
          selSF.datum([newDataset]);
        } else {
          const currentData = selSF.datum()[0];
          for(let i = 1; i < newDataset.length; i++) {
            currentData.push(newDataset[i]);
            selSF.datum([currentData]);
          }
        }
      }

      //Net flows for transitions in a discrete form
      const oldSusceptibleValue = Math.round(params.S)
      const newSusceptibleValue = Math.round(newDataset[newDataset.length - 1].sSusceptible)
      const netFlowSusceptibles = newSusceptibleValue - oldSusceptibleValue;
      const oldRecoveredValue = Math.round(params.R)
      const newRecoveredValue = Math.round(newDataset[newDataset.length - 1].sRecovered)
      const netFlowRecovered  = newRecoveredValue - oldRecoveredValue;
      const newInfectedValue = Math.round(newDataset[newDataset.length - 1].sInfected)
      //Draw timeseries on each chart
      const stopTime = parseInt($("#varValueTo").text());
      const currentSelectedVar = $(`#selVarSF`).val();
      const currentVarDisplay = $('#selVarSF option:selected').text();
      let optionsUTC = {
        'newDataset': newDataset,
        'tsClass': 'tsSF',
        'variable': currentSelectedVar,
        'svgId': 'svgTSSF',
        'title': currentVarDisplay,
        'idLine': 'SFline',
        'classLine': 'tsLine tsSF',
        'w': w,
        'h': h,
        'stopTime': stopTime,
      }
      updateTimeChart(optionsUTC);

      optionsUTC = {
        'newDataset': newDataset,
        'tsClass': 'tsPar',
        'variable': 'netReproductionNumber',
        'svgId': 'svgTSPar',
        'title': 'Net reproduction number',
        'idLine': 'parline',
        'classLine': 'tsLine tsPar',
        'w': w,
        'h': h / 2,
        'stopTime': stopTime,
      }
      updateTimeChart(optionsUTC);

      /**
       * Step button Sparklines
       */
      slBuilder.buildSparklines(newDataset, stopTime, padding, w, h, true);
      /*
       * Transitions in the Stock & Flow Diagram
       */
       let optionsTransition = {
         'from': 'Susceptible',
         'to': 'Infected',
         'newValueFrom': newSusceptibleValue,
         'newValueTo': newInfectedValue,
         'totalFlow': Math.abs(netFlowSusceptibles),
         'xDestStcStart': 255,
         'xDestStcLength': 150,
         'yDestStcStart': 30,
         'yDestStcLength': 100,
         'xOrgnStcEnd': 155,
         'yOrgnStcStart': 30,
         'svgId': 'svgSAF',
         'flowyStart' : 70,
         'flowHeight' : 20
       }
       saf.animateFlow(optionsTransition);

       optionsTransition = {
         'from': 'Infected',
         'to': 'Recovered',
         'newValueFrom': newInfectedValue,
         'newValueTo': newRecoveredValue,
         'totalFlow': Math.abs(netFlowRecovered),
         'xDestStcStart': 505,
         'xDestStcLength': 150,
         'yDestStcStart': 30,
         'yDestStcLength': 100,
         'xOrgnStcEnd': 405,
         'yOrgnStcStart': 30,
         'svgId': 'svgSAF',
         'flowyStart' : 70,
         'flowHeight' : 20
       }
       saf.animateFlow(optionsTransition);

       const newTime = String(currentTime + 1);
       $('#varValueCurTim').text(newTime);
       if(currentTime + 1  === stopTime) {
         $('#slInfected').slider('enable');
       }

       const lastElement = newDataset[newDataset.length - 1];
       const stock = $("#selLoopDominance").val()
       cld.highlightDominantLoop(lastElement, stock);

       const changeSelect = $('#selLoopDominance').change(function () {
         const stock = $(this).val();
         const lastElement = changeSelect.Data;
         cld.highlightDominantLoop(lastElement, stock);
       });

       changeSelect.Data = lastElement; //Binds data to the function
    }); // Closes OnClick Event
}

const updateTimeChart = (options) => {
  const newDataset = options.newDataset;
  const padding = 40;
  // Extract datasets from the lines in the chart
  let superDataset = [];
  const currentDatasets = d3.selectAll(`.${options.tsClass}`).data();
  currentDatasets.forEach(dataset => {
    superDataset.push(dataset);
  });
  let loopStart;
  let tsDataset = [];
  const currentTime = parseInt($('#varValueCurTim').text());
  const minTime = parseInt($('#varValueFrom').text());
  if(currentTime === minTime){
    const emptyDataset = [];
    superDataset.push(emptyDataset);
    d3.selectAll('.svgSparkline').remove();
    loopStart = 0;
  } else {
    tsDataset = superDataset[superDataset.length - 1];
    loopStart = 1;
  }

  let x = newDataset.map(d => d.time);
  let y = newDataset.map(d => d[options.variable]);
  let length = x.length;
  let twoDimensionDataset = [];
  for (let i = 0; i < length; i++) {
    let temp = {
      'x' : x[i],
      'y' : y[i]
    };
    twoDimensionDataset.push(temp);
  }

  for(let i = loopStart; i < twoDimensionDataset.length; i++){
           tsDataset.push(twoDimensionDataset[i]);
  }

  superDataset[superDataset.length - 1] = tsDataset;

  const optionsTS = {
    'dataset': superDataset,
    'svgId': options.svgId,
    'padding': padding,
    'w': options.w,
    'h': options.h,
    'title': options.title,
    'finishTime': options.stopTime,
    'lineDuration': 0,
    'idLine': options.idLine,
    'classLine': options.classLine,
  }
  d3.selectAll(`.${options.tsClass}`).remove();
  tsline.drawLine(optionsTS);
}
