const $ = require('jquery');
import * as d3 from 'd3';
import * as tsline from "../../components/tsLine.ts";

export const drawTimeseriesSF = superDataset => {
  d3.selectAll(".tsSF").remove();
  const w = 800 * (2 / 3); //Width
  const h = 500 * (2 / 3); //Heigth
  const padding = 40;
  const stopTime = parseInt($("#varValueTo").text());

  const options = {
    'dataset': superDataset,
    'svgId': "svgTSSF",
    'padding': padding,
    'w': w,
    'h': h,
    'finishTime': stopTime,
    'lineDuration': 2000,
    'idLine': 'SFline',
    'classLine': 'tsLine tsSF',
  }
  tsline.drawLine(options);
}

export const buildCharts = (w, h, padding) => {
  //parameters blank chart
  const items = [
  {'value': 'sSusceptible', 'text': 'Susceptible'},
  {'value': 'sInfected', 'text': 'Infected'},
  {'value': 'sRecovered', 'text': 'Recovered'},
  {'value': 'IR', 'text': 'Infection rate'},
  {'value': 'RR', 'text': 'Recovery rate'}
  ]
  const options = {
    'xmin': 0,
    'xmax': 100,
    'ymin': 0,
    'ymax': 8,
    'w': w,
    'h': h,
    'padding': padding,
    'parentId': 'divTSSF',
    'svgId': 'svgTSSF',
    'selectId': 'selVarSF',
    'items': items,
  }
  tsline.drawChart(options);

  //parameters blank chart
  const options2 = {
    'xmin': 0,
    'xmax': 100,
    'ymin': 0,
    'ymax': 8,
    'w': w,
    'h': h / 2,
    'padding': padding,
    'parentId': 'divParTS',
    'svgId': 'svgTSPar',
    'selectId': 'selVarSF',

  }
  tsline.drawChart(options2);

}
