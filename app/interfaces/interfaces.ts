import * as d3 from 'd3';
import * as sl from "./components/sparkline.ts";
import * as timeseries from "./components/timeseries.ts";
import * as ut from "./components/utilities.ts";
import * as saf from "./components/stocksandflows.ts";
import * as intf1 from "./collection/1/1.ts";
const $ = require('jquery');

const w = 800 * (2 / 3); //Width
const h = 500 * (2 / 3); //Heigth
const padding = 40;

const caseStudyData = [
  {'x': 0, 'y': 1},
  {'x': 1, 'y': 3},
  {'x': 2, 'y': 25},
  {'x': 3, 'y': 72},
  {'x': 4, 'y': 222},
  {'x': 5, 'y': 282},
  {'x': 6, 'y': 256},
  {'x': 7, 'y': 233},
  {'x': 8, 'y': 189},
  {'x': 9, 'y': 123},
  {'x': 10, 'y': 70},
  {'x': 11, 'y': 25},
  {'x': 12, 'y': 11},
  {'x': 13, 'y': 4},
];

export const drawButton = () => {

  d3.select('#bDraw')
    .on('click', () => {
      d3.selectAll('.tsLine').remove();
      d3.selectAll('.caseStudyLine').remove();
      d3.selectAll('.tsPoint').remove();
      $('#slInfected').slider('disable');
      $('#slInfected').slider('setValue', caseStudyData[0].y, false);
      $("#lInfected").text(String(caseStudyData[0].y));
      const options = {
        'dataset': caseStudyData,
        'svgId': "tsSF",
        'padding': padding,
        'w': w,
        'h': h,
        'title': 'Infected',
        'finishTime': 20,
        'lineDuration': 2000,
        'idLine': 'caseStudyInfluenza',
        'classLine': 'caseStudyLine',
        'circles': true,
      }
      timeseries.drawLine(options);
    });
}

export const caseStudyTable = () => {
  const keys = Object.keys(caseStudyData[0]);
  const table = d3.select('#caseStudyTable')
                  .append('table')
                  .attr('class', 'mx-auto tblCaseStudy');
  const rows = 2;
  let tr;
  for(let i = 0; i < rows; i++){
    tr = table.append('tr');
    for(let j = 0; j < caseStudyData.length; j++){
      tr.append('td')
        .attr('class', 'px-2')
        .text(caseStudyData[j][keys[i]]);
    }
  }
}

export const getContent = (modelId, fetchJSON) => {
  const id = String(modelId)

  switch(id){
    case '1':
     intf1.buildInterface(modelId, fetchJSON);
    break;
  }
}
