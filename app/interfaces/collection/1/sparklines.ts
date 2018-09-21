import * as d3 from 'd3';
import * as sl from "../../components/sparkline.ts";
import * as tsline from "../../components/tsLine.ts";
/**
 * Create sparklines in the auxTS div.
 * @param {Object} dataset - Data produced by the simulated SD model.
 * @param {number} stopTime - The time that the simulation stops.
 * @param {number} p - Horinzontal & vertical padding of the SVG.
 * @param {number} w - SVG's width of the timeseries stock & flow chart.
 * @param {number} h - SVG's height of the timeseries stock & flow chart.
 * @param {boolean} step - Indicates whether the simulation is run in step mode.
 */
export const buildSparklines = (dataset, stopTime, p, w, h, step = false) => {
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

  const arrayLength = variableList.length;

  for (let i = 0; i < arrayLength; i++) {
    const splVariable = variableList[i].display;
    let splDataset = [];
    let x = dataset.map(d => d.time);
    let y = dataset.map(d => d[variableList[i].name]);
    let length = x.length;
    let loopStart = 0;
    const isEmpty = d3.select(`#spl${splVariable}`).empty()
    if(step && !isEmpty){
      loopStart = 1;
      splDataset = d3.select(`#spl${splVariable}`)
                     .datum();
    }
    let delay = 2000;
    if(step){
      delay = 0
    }

    for (let i = loopStart; i < length; i++) {
      let temp = {
        'x' : x[i],
        'y' : y[i]
      };
      splDataset.push(temp);
    }

    let svgSparkLineId = `splSVG${splVariable}`;
    d3.select(`#${svgSparkLineId}`).remove();
    const optionsCrtSpl = {
      'parentId' : parentId,
      'height'   : splHeight,
      'width'    : splWidth,
      'padding'  : splPadding,
      'dataset'  : splDataset,
      'variable' : splVariable,
      'svgId'    : svgSparkLineId,
      'duration' : 1,
      'delay'    : delay,
      'finishTime': stopTime,
    };

    sl.createSparkline(optionsCrtSpl);
    let superDataset = [];
    superDataset.push(splDataset);

    let optionsClickEvent = {
      'dataset': superDataset,
      'svgId': "svgTSSF",
      'padding': p,
      'w': w,
      'h': h,
      'title': splVariable,
      'finishTime': stopTime,
      'lineDuration': 2000,
      'idLine': 'SFline1',
      'classLine': 'tsLine tsSF',
    }
    sl.addOnClickEvent(svgSparkLineId, tsline.drawLine,
      optionsClickEvent);
  }
}
