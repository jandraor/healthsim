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
      let isEmpty = d3.select('#SFline').empty();
      let currentDataset = []; //
      let tsDataset = [];
      let loopStart, startTime;

      if(!isEmpty){
        currentDataset = d3.select('#SFline')
                            .datum();
        tsDataset = currentDataset.slice();
        loopStart = 1;
        const arrayLength = tsDataset.length;
        startTime = currentDataset[currentDataset.length - 1].x;
      } else{
        loopStart = 0;
        startTime = 0;
      }

      const finishTime = startTime + 1;
      const params = ut.getParameters(String(model_id), true, startTime, finishTime);
      console.log(params);
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
      console.log(newDataset);
      //Draw timeseries in the stock and flow chart
      let x = newDataset.map(d => d.time);
      let y = newDataset.map(d => d.sSusceptible);
      let length = x.length;
      let susNewDataset = []; //Susceptibles new dataset
      for (let i = 0; i < length; i++) {
        let temp = {
          'x' : x[i],
          'y' : y[i]
        };
        susNewDataset.push(temp);
      }

      for(let i = loopStart; i < susNewDataset.length; i++){
               tsDataset.push(susNewDataset[i]);
      }

      let options = {
        'dataset': tsDataset,
        'svgId': "tsSF",
        'padding': padding,
        'w': w,
        'h': h,
        'title': 'Susceptible',
        'finishTime': 20,
        'lineDuration': 0,
        'idLine': 'SFline',
        'classLine': 'tsLine',
      }
      d3.select('#SFline').remove();
      timeseries.drawLine(options);

      //Draw timeseries in the parameter chart
      isEmpty = d3.select('#parline').empty();
      currentDataset = [];
      tsDataset = [];

      if(!isEmpty){
        currentDataset = d3.select('#parline')
                            .datum();
        tsDataset = currentDataset.slice();
        loopStart = 1;
      } else{
        loopStart = 0;
      }

      x = newDataset.map(d => d.time);
      y = newDataset.map(d => d.netReproductionNumber);
      length = x.length;
      let netRNNewDataset = []; //net Reprouduction Number new dataset
      for (let i = 0; i < length; i++) {
        let temp = {
          'x' : x[i],
          'y' : y[i]
        };
        netRNNewDataset.push(temp);
      }

      for(let i = loopStart; i < netRNNewDataset.length; i++){
               tsDataset.push(netRNNewDataset[i]);
      }

      options = {
        'dataset': tsDataset,
        'svgId': "tsPar",
        'padding': padding,
        'w': w,
        'h': h / 2,
        'title': 'Net reproduction number',
        'finishTime': 20,
        'lineDuration': 0,
        'idLine': 'parline',
        'classLine': 'tsLine',
      }
      d3.select('#parline').remove();
      timeseries.drawLine(options);
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

       let optionsClickEvent = {
         'dataset': splDataset,
         'svgId': "tsSF",
         'padding': padding,
         'w': w,
         'h': h,
         'title': splVariable,
         'finishTime': 20,
         'lineDuration': 2000,
         'idLine': 'SFline',
         'classLine': 'tsLine',
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
    }); // Closes OnClick Event
}
