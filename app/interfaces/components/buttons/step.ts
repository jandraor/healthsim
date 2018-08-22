const $ = require('jquery');
import * as d3 from 'd3';
import * as ut from "../utilities.ts";
import * as timeseries from "../timeseries.ts";
import * as sl from "../sparkline.ts";
import * as saf from "../stocksandflows.ts";

export const build = (model_id, fetchJSON) => {
  const w = 800 * (2 / 3); //Width
  const h = 500 * (2 / 3); //Heigth
  const padding = 40;

  d3.select('#bStep')
    .on("click", async() => {
      // $('#bStep').prop("disabled", true);
      // $('#bRun').prop("disabled", true);
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
        if(!$('#cbComparative').is(":checked")){
          d3.selectAll(".tsLine").remove();
          d3.selectAll(".svgSparkline").remove();
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
      //Net flows for transitions in a discrete form
      const oldSusceptibleValue = Math.round(params.S)
      const newSusceptibleValue = Math.round(newDataset[newDataset.length - 1].sSusceptible)
      const netFlowSusceptibles = newSusceptibleValue - oldSusceptibleValue;
      const oldRecoveredValue = Math.round(params.R)
      const newRecoveredValue = Math.round(newDataset[newDataset.length - 1].sRecovered)
      const netFlowRecovered  = newRecoveredValue - oldRecoveredValue;
      updateTimeChart(newDataset, 'tsSF', 'sSusceptible', 'svgTSSF',
      'Susceptible','SFLine','tsLine tsSF', w, h);
      updateTimeChart(newDataset, 'tsPar', 'netReproductionNumber', 'svgTSPar',
      'Net reproduction number','parLine','tsLine tsPar', w, h / 2);

      /**
       Step button Sparklines
       */
      //d3.selectAll(".svgSparkline").remove();
      const parentId = 'divSL';
      let splWidth = 250;
      let splHeight = 25
      let splPadding = {
        'top': 2,
        'left': 0,
        'right': 130,
        'bottom': 2
       }

       const variableList = [
         {'name': 'sSusceptible', 'display': 'Susceptible'},
         {'name': 'sInfected', 'display': 'Infected'},
         {'name': 'sRecovered', 'display': 'Recovered'},
         {'name': 'IR', 'display': 'Infection-Rate'},
         {'name': 'RR', 'display': 'Recovery-Rate'}]

      let arrayLength = variableList.length;
      let isEmpty, loopStart, x, y;
      for (let i = 0; i < arrayLength; i++) {
        let splDataset = [];
        let splVariable = variableList[i].display;
        isEmpty = d3.select(`#spl${splVariable}`).empty();

        if(!isEmpty){
          splDataset = d3.select(`#spl${splVariable}`)
                             .datum();
          loopStart = 1;
        } else {
          loopStart = 0;
        }

        x = newDataset.map(d => d.time);
        y = newDataset.map(d => d[variableList[i].name]);
        length = x.length;

        let twoDimensionDataset = [];

        for (let i = 0; i < length; i++) {
          let temp = {
            'x' : x[i],
            'y' : y[i]
          };
          twoDimensionDataset.push(temp);
       }

       for(let i = loopStart; i < twoDimensionDataset.length; i++){
                splDataset.push(twoDimensionDataset[i]);
       }

       let svgSparkLineId = `splSVG${splVariable}`;
       d3.select(`#splSVG${splVariable}`).remove();

       const optionsCrtSpl = {
         'parentId' : parentId,
         'height'   : splHeight,
         'width'    : splWidth,
         'padding'  : splPadding,
         'dataset'  : splDataset,
         'variable' : splVariable,
         'svgId'    : svgSparkLineId,
         'duration' : 1,
         'delay'    : 0,
         'finishTime': 20
       };

       sl.createSparkline(optionsCrtSpl);
       let superDataset = [];
       superDataset.push(splDataset);
       let optionsClickEvent = {
         'dataset': superDataset,
         'svgId': "tsSF",
         'padding': padding,
         'w': w,
         'h': h,
         'title': splVariable,
         'finishTime': 20,
         'lineDuration': 2000,
         'idLine': 'SFline',
         'classLine': 'tsLine tsSF',
      }
      sl.addOnClickEvent(svgSparkLineId, timeseries.drawLine,
         optionsClickEvent);
      }

      /*
       * Transitions in the Stock & Flow Diagram
       */
       let optionsTransition = {
         'from': 'crcSusceptible',
         'to': 'crcInfected',
         'totalFlow': Math.abs(netFlowSusceptibles),
         'xDestStcStart': 255,
         'xDestStcLength': 150,
         'yDestStcStart': 20,
         'yDestStcLength': 100,
         'xOrgnStcEnd': 155,
         'yOrgnStcStart': 20,
         'svgId': 'svgSAF',
         'flowyStart' : 60,
         'flowHeight' : 20
       }
       saf.animateFlow(optionsTransition);

       optionsTransition = {
         'from': 'crcInfected',
         'to': 'crcRecovered',
         'totalFlow': Math.abs(netFlowRecovered),
         'xDestStcStart': 505,
         'xDestStcLength': 150,
         'yDestStcStart': 20,
         'yDestStcLength': 100,
         'xOrgnStcEnd': 405,
         'yOrgnStcStart': 20,
         'svgId': 'svgSAF',
         'flowyStart' : 60,
         'flowHeight' : 20
       }
       saf.animateFlow(optionsTransition);

       const newTime = String(currentTime + 1);
       $('#varValueCurTim').text(newTime);
    }); // Closes OnClick Event
}

const updateTimeChart = (newDataset, tsClass, variableName, svgId, title, idLine, classLine, w, h) => {
  const padding = 40;
  // Extract datasets from the lines in the chart
  let superDataset = [];
  const currentDatasets = d3.selectAll(`.${tsClass}`).data();
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
  let y = newDataset.map(d => d[variableName]);
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
  console.log('superDataset:')
  console.log(superDataset);
  const options = {
    'dataset': superDataset,
    'svgId': svgId,
    'padding': padding,
    'w': w,
    'h': h,
    'title': title,
    'finishTime': 20,
    'lineDuration': 0,
    'idLine': idLine,
    'classLine': classLine,
  }
  console.log('options:')
  console.log(options);
  d3.selectAll(`.${tsClass}`).remove();
  timeseries.drawLine(options);
}
