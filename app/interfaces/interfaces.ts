const Slider = require("bootstrap-slider");
import * as d3 from 'd3';
import * as sl from "./helpers/sparkline.ts";
import * as timeseries from "./helpers/timeseries.ts";
import * as ut from "./helpers/utilities.ts";
const w = 800 * (2 / 3); //Width
const h = 500 * (2 / 3); //Heigth
const padding = 40;

export const buildSliders = () => {
  const InfectedSlider = new Slider("#slInfected");
  InfectedSlider.on("slide", sliderValue => {
    document.getElementById("lInfected").textContent = sliderValue;
  });

  const ContactRateSlider = new Slider("#slContactRate");
  ContactRateSlider.on("slide", sliderValue => {
    document.getElementById("lContactRate").textContent = sliderValue;
  });

  const InfectivitySlider = new Slider("#slInfectivity");
  InfectivitySlider.on("slide", sliderValue => {
    document.getElementById("lInfectivity").textContent = sliderValue;
  });

  const RecoveryDelaySlider = new Slider("#slRecoveryDelay");
  RecoveryDelaySlider.on("slide", sliderValue => {
    document.getElementById("lRecoveryDelay").textContent = sliderValue;
  });
}

export const drawBlankChart = () => {
  //parameters blank chart
  let options = {
    'xmin': 0,
    'xmax': 100,
    'ymin': 0,
    'ymax': 8,
    'w': w,
    'h': h,
    'padding': padding,
    'parentId': 'mainTS',
    'elemId': 'tsSF',
  }
  timeseries.drawChart(options);

  //parameters blank chart
  options = {
    'xmin': 0,
    'xmax': 100,
    'ymin': 0,
    'ymax': 8,
    'w': w,
    'h': h / 2,
    'padding': padding,
    'parentId': 'mainTS',
    'elemId': 'tsPar',
  }

  timeseries.drawChart(options);
}

export const runButton = (model_id, fetchJSON)  => {
  d3.select("#bRun")
    .on("click", async() => {
      const tslines = d3.selectAll(".tsline")
      tslines.remove();
      const params = ut.getParameters(String(model_id));
      const paramsUrl = ut.concatenateParameters(params);
      const url = `/simulate/model/${model_id}/${paramsUrl}`;
      const rawDataset = await fetchJSON(url);
      const dataset = ut.parseDataset(rawDataset, String(model_id));

      //Draw timeseries in the stock and flow chart
      let x = dataset.map(d => d.time);
      let y = dataset.map(d => d.sSusceptible);
      let length = x.length;

      let tsDataset = [];
      for (let i = 0; i < length; i++) {
        let temp = {
          'x' : x[i],
          'y' : y[i]
        };
        tsDataset.push(temp);
      }

      let options = {
        'dataset': tsDataset,
        'svgId': "tsSF",
        'padding': padding,
        'w': w,
        'h': h,
        'title': 'Susceptible',
        'finishTime': 20,
        'lineDuration': 2000,
        'idLine': 'SFline'
      }
      timeseries.drawLine(options);

      //Draw timeseries in the parameter chart
      x = dataset.map(d => d.time);
      y = dataset.map(d => d.netReproductionNumber);
      length = x.length;

      tsDataset = [];
      for (let i = 0; i < length; i++) {
        let temp = {
          'x' : x[i],
          'y' : y[i]
        };
        tsDataset.push(temp);
      }

      options = {
        'dataset': tsDataset,
        'svgId': "tsPar",
        'padding': padding,
        'w': w,
        'h': h / 2,
        'title': 'Net reproduction number',
        'finishTime': 20,
        'lineDuration': 2000,
        'idLine': 'parLine'
      }
      timeseries.drawLine(options);

      /*
      Run button - Sparklines
      */
      d3.selectAll(".svgSparkline").remove();
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
        let splVariable = variableList[i].display;
        x = dataset.map(d => d.time);
        y = dataset.map(d => d[variableList[i].name]);
        length = x.length;
        let splDataset = [];

        for (let i = 0; i < length; i++) {
          let temp = {
            'x' : x[i],
            'y' : y[i]
          };
          splDataset.push(temp);
        }

        let svgSparkLineId = `splSVG${splVariable}`;
        const optionsCrtSpl = {
          'parentId' : parentId,
          'height'   : splHeight,
          'width'    : splWidth,
          'padding'  : splPadding,
          'dataset'  : splDataset,
          'variable' : splVariable,
          'svgId'    : svgSparkLineId,
          'duration' : 1,
          'delay'    : 2000,
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
          'idLine': 'SFline'
        }
        sl.addOnClickEvent(svgSparkLineId, timeseries.drawLine,
          optionsClickEvent);
      }
    });
}

export const stepButton = (model_id, fetchJSON) => {
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
      const params = ut.getParameters(String(model_id), true, startTime, finishTime)
      const paramsUrl = ut.concatenateParameters(params);
      const url = `/simulate/model/${model_id}/${paramsUrl}`;
      const rawDataset = await fetchJSON(url);
      const newDataset = ut.parseDataset(rawDataset, String(model_id));
      console.table(newDataset, ['time', 'sSusceptible', 'sInfected', 'sRecovered', 'basicReproductionNumber',
                               'netReproductionNumber', 'IR','RR']);

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
        'idLine': 'SFline'
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
        'idLine': 'parline'
      }
      d3.select('#parline').remove();
      timeseries.drawLine(options);
      /*
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
         'idLine': 'SFline'
      }
      sl.addOnClickEvent(svgSparkLineId, timeseries.drawLine,
         optionsClickEvent);
      }
    });
}
