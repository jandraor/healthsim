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

export const update = (dataset, delay) => {
  d3.selectAll(`.crcSusceptible`).remove();
  d3.selectAll(`.crcInfected`).remove();
  d3.selectAll(`.crcRecovered`).remove();
  d3.selectAll('.lblStc').remove();
  saf.fillStock('svgSAF', 'Susceptible', Math.round(dataset.sSusceptible), delay);
  saf.fillStock('svgSAF', 'Infected', Math.round(dataset.sInfected), delay);
  saf.fillStock('svgSAF', 'Recovered',Math.round(dataset.sRecovered), delay);
}

export const animate = (oldSusceptible, newSusceptible, newInfected,
  oldRecovered, newRecovered, duration) => {
  const netFlowSus = newSusceptible - oldSusceptible;
  let optionsTransition = {
    'from': 'Susceptible',
    'to': 'Infected',
    'newValueFrom': newSusceptible,
    'newValueTo': newInfected,
    'totalFlow': Math.abs(netFlowSus),
    'xDestStcStart': 255,
    'xDestStcLength': 150,
    'yDestStcStart': 30,
    'yDestStcLength': 100,
    'xOrgnStcEnd': 155,
    'yOrgnStcStart': 30,
    'svgId': 'svgSAF',
    'flowyStart' : 70,
    'flowHeight' : 20,
    'duration': duration
  }
  saf.animateFlow(optionsTransition);
  const netFlowRec = newRecovered - oldRecovered
  optionsTransition = {
    'from': 'Infected',
    'to': 'Recovered',
    'newValueFrom': newInfected,
    'newValueTo': newRecovered,
    'totalFlow': Math.abs(netFlowRec),
    'xDestStcStart': 505,
    'xDestStcLength': 150,
    'yDestStcStart': 30,
    'yDestStcLength': 100,
    'xOrgnStcEnd': 405,
    'yOrgnStcStart': 30,
    'svgId': 'svgSAF',
    'flowyStart' : 70,
    'flowHeight' : 20,
    'duration': duration
  }
  saf.animateFlow(optionsTransition);
}
