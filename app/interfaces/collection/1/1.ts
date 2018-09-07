const $ = require('jquery');
import * as d3 from 'd3';
import * as slds from "../../components/sliders.ts"
import * as select from "../../components/select.ts"
import * as timeseries from "../../components/timeseries.ts";
import * as tables from "../../components/table.ts";
import * as saf from "../../components/stocksandflows.ts";
import * as runButton from '../../components/buttons/run.ts';
import * as stepButton from '../../components/buttons/step.ts';
import * as cld from '../../components/cld.ts';
import * as drawButton from '../../components/buttons/drawCaseStudy.ts';

export const buildInterface = (modelId, fetchJSON) => {
  const w = 800 * (2 / 3); //Width
  const h = 500 * (2 / 3); //Height
  const padding = 40;
  //parameters blank chart
  const items = [
  {'value': 'sSusceptible', 'text': 'Susceptible'},
  {'value': 'sInfected', 'text': 'Infected'},
  {'value': 'sRecovered', 'text': 'Recovered'},
  {'value': 'IR', 'text': 'Infection rate'},
  {'value': 'RR', 'text': 'Recovery rate'}
  ]
  let options = {
    'xmin': 0,
    'xmax': 100,
    'ymin': 0,
    'ymax': 8,
    'w': w,
    'h': h,
    'padding': padding,
    'parentId': 'mainTS',
    'svgId': 'svgTSSF',
    'selectId': 'selVarSF',
    'items': items,
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
    'svgId': 'svgTSPar',
    'selectId': 'selVarSF',
    'items': items,
  }
  timeseries.drawChart(options);

  /*
   * Build stock and flow diagram
   */
  const population = parseFloat($('#varValueTotalPop').text());
  const svg = d3.select('#stockFlowDiagram')
                .append('svg')
                .attr('width', 700)
                .attr('height', 250)
                .attr('id', 'svgSAF')

  const nInfected = parseFloat(document.getElementById("lInfected").textContent);

  //Susceptible
  let stockOptions = {
    'xmin': 5,
    'ymin': 20,
    'ylength': 100,
    'xlength': 150,
    'svgId': 'svgSAF',
    'classFilling': 'crcSusceptible',
    'initialValue': population - nInfected,
    'idStock': 'stcSusceptible'
  }
  saf.drawStock(stockOptions);
  //Infected
  stockOptions = {
    'xmin': 255,
    'ymin': 20,
    'ylength': 100,
    'xlength': 150,
    'svgId': 'svgSAF',
    'classFilling': 'crcInfected',
    'initialValue': nInfected,
    'idStock': 'stcInfected'
  }
  saf.drawStock(stockOptions);
  //Recovered
  stockOptions = {
    'xmin': 505,
    'ymin': 20,
    'ylength': 100,
    'xlength': 150,
    'svgId': 'svgSAF',
    'classFilling': 'crcRecovered',
    'initialValue': 0,
    'idStock': 'stcRecovered'
  }
  saf.drawStock(stockOptions);

  let flowOptions = {
    'svgId': 'svgSAF',
    'yLength': 100,
    'yMin': 20,
    'xStart': 155,
    'xEnd': 255
  }
  saf.drawFlow(flowOptions);

  flowOptions = {
    'svgId': 'svgSAF',
    'yLength': 100,
    'yMin': 20,
    'xStart': 405,
    'xEnd': 505
  }
  saf.drawFlow(flowOptions);

  runButton.build(modelId, fetchJSON);
  stepButton.build(modelId, fetchJSON);
  cld.drawCLD('feedbackLoopDiagram');

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
  tables.drawHorizontalTable(caseStudyData, 'caseStudyTable');
  drawButton.build(caseStudyData,'bDraw');
  slds.buildSliders();
  select.buildSelects();

}
