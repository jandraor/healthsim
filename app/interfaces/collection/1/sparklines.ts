import * as d3 from 'd3';
import * as sl from "../../components/sparkline.ts";
import * as tsline from "../../components/tsLine.ts";
/**
 * Create sparklines in the auxTS div.
 * @param {Object} dataset - Data produced by the simulated SD model.
 * @param {Number} stopTime - The time that the simulation stops.
 * @param {Number} padding - Horinzontal & vertical padding of the SVG.
 * @param {Number} w - SVG's width of the timeseries stock & flow chart.
 * @param {Number} h - SVG's height of the timeseries stock & flow chart.
 */
export const buildSparklines = (dataset, stopTime, padding, w, h) => {
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
    let x = dataset.map(d => d.time);
    let y = dataset.map(d => d[variableList[i].name]);
    let length = x.length;
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
      'finishTime': stopTime,
    };

    sl.createSparkline(optionsCrtSpl);
    let superDataset = [];
    superDataset.push(splDataset);

    let optionsClickEvent = {
      'dataset': superDataset,
      'svgId': "svgTSSF",
      'padding': padding,
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
