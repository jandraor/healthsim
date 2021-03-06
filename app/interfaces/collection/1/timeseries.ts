const $ = require('jquery');
import * as d3 from 'd3';
import * as tsline from "../../components/tsLine.ts";

const w = 800 * (2 / 3); //Width
const h = 500 * (2 / 3); //Heigth
const padding = 40;

export const drawTimeseriesSF = superDataset => {
  d3.selectAll(".tsSF").remove();
  const stopTime = parseInt($("#varValueTo").text());

  const options = {
    'superDataset': superDataset,
    'svgId': "svgTSSF",
    'padding': padding,
    'finishTime': stopTime,
    'lineDuration': 2000,
    'idLine': 'SFline',
    'classLine': 'tsLine tsSF',
    'tooltip': true,
  }
  tsline.drawLine(options);
}

export const buildCharts = () => {
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
    'width': w,
    'height': h,
    'padding': padding,
    'svgId': 'svgTSSF',
  }
  tsline.drawChart(options);

  //parameters blank chart
  const options2 = {
    'xmin': 0,
    'xmax': 100,
    'ymin': 0,
    'ymax': 8,
    'width': w,
    'height': h / 2,
    'padding': padding,
    'svgId': 'svgTSPar',
  }
  tsline.drawChart(options2);

}

export const reset = () => {
  $('.svgTS').each(function(){
    tsline.clearAll(this.id);
  })
  buildCharts();
}
