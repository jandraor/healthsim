const $ = require('jquery');
import * as d3 from 'd3';
import * as saf from "../../components/stocksandflows.ts";

/*
 * Build stock and flow diagram
 */
export const buildStockAndFlow = () => {
  const population = parseFloat($('#varValueTotalPop').text());
  const nInfected = parseFloat(document.getElementById("lInfected").textContent);
  const svg = d3.select('#stockFlowDiagram')
                .append('svg')
                .attr('width', 700)
                .attr('height', 250)
                .attr('id', 'svgSAF')

  const yStart = 30;

  //Susceptible
  let stockOptions = {
    'xmin': 5,
    'ymin': yStart,
    'ylength': 100,
    'xlength': 150,
    'svgId': 'svgSAF',
    'classFilling': 'crcSusceptible',
    'initialValue': population - nInfected,
    'idStock': 'stcSusceptible',
    'label': 'Susceptible'
  }
  saf.drawStock(stockOptions);
  //Infected
  stockOptions = {
    'xmin': 255,
    'ymin': yStart,
    'ylength': 100,
    'xlength': 150,
    'svgId': 'svgSAF',
    'classFilling': 'crcInfected',
    'initialValue': nInfected,
    'idStock': 'stcInfected',
    'label': 'Infected'
  }
  saf.drawStock(stockOptions);
  //Recovered
  stockOptions = {
    'xmin': 505,
    'ymin': yStart,
    'ylength': 100,
    'xlength': 150,
    'svgId': 'svgSAF',
    'classFilling': 'crcRecovered',
    'initialValue': 0,
    'idStock': 'stcRecovered',
    'label': 'Recovered'
  }
  saf.drawStock(stockOptions);

  let flowOptions = {
    'svgId': 'svgSAF',
    'yLength': 100,
    'yMin': yStart,
    'xStart': 155,
    'xEnd': 255
  }
  saf.drawFlow(flowOptions);

  flowOptions = {
    'svgId': 'svgSAF',
    'yLength': 100,
    'yMin': yStart,
    'xStart': 405,
    'xEnd': 505
  }
  saf.drawFlow(flowOptions);
}
