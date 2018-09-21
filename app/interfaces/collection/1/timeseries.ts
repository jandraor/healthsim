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
