import * as d3 from 'd3';
const $ = require('jquery');

export const concatenateParameters = parametersObject => {
  let params = "";
  for (let key in parametersObject) {
    if (parametersObject.hasOwnProperty(key)) {
      params += `${key}=${parametersObject[key]}&`;
    }
  }
  params = params.replace(/&$/, "");
  const urlParams = `?${params}`;
  return (urlParams)
}

export const parseDataset = (rawDataset, model_id) => {
  let parsedDataset = [];
  switch(model_id) {
    case '1':

    const rowConverter = d => {
        return {
          time: parseFloat(d.time),
          sSusceptible: parseFloat(d.sSusceptible),
          sInfected: parseFloat(d.sInfected),
          sRecovered: parseFloat(d.sRecovered),
          basicReproductionNumber: parseFloat(d.basicReproductionNumber),
          netReproductionNumber: parseFloat(d.netReproductionNumber),
          IR: parseFloat(d.IR),
          RR: parseFloat(d.RR),
          dl_sSusceptible: parseFloat(d.dl_sSusceptible),
          dl_sInfected: parseFloat(d.dl_sInfected),
          dl_sRecovered: parseFloat(d.dl_sRecovered)
        }
    }

    let arrayLength = rawDataset.length;
    for (let i = 0; i < arrayLength; i++) {
      parsedDataset[i] = rowConverter(rawDataset[i]);
    }
    break;

    default:
      throw(`Model ${model_id} not found`);
  }
  return(parsedDataset);
}

export const getParameters = (modelId, step = false,
  startTime, finishTime) => {
    let parametersObject;

    switch(modelId){
      case '1':
        const totalPop = parseInt($('#varValueTotalPop').text())
        let susceptible, infected, recovered;
        if(step === true && startTime > 0){
          const susceptibleDataset = d3.select('#splSusceptible').datum();
          susceptible = susceptibleDataset[susceptibleDataset.length - 1].y
          const infectedDataset = d3.select('#splInfected').datum();
          infected = infectedDataset[infectedDataset.length - 1].y
          const recoveredDataset = d3.select('#splRecovered').datum();
          recovered = recoveredDataset[recoveredDataset.length - 1].y
        } else {
          infected = document.getElementById("lInfected").textContent;
          susceptible = totalPop - infected;
          recovered = 0
        }

        parametersObject = {
         'S': susceptible,
         'I': infected,
         'R': recovered,
         'cr': document.getElementById("lContactRate").textContent,
         'ift': document.getElementById("lInfectivity").textContent,
         'rd': document.getElementById("lRecoveryDelay").textContent,
         'startTime': startTime,
         'stopTime': finishTime
        }
        break;

      default:
        throw `Model ${modelId} not found`;
  }
  return (parametersObject);
}

/**
 * superDataset is a vector in which each element is a
 * two-dimension dataset.
 * Each two-dimension dataset is a vector in which each element is a JSON object
 */
export const findExtremePoints = (superDataset) => {
  let xmax = d3.max(superDataset[0], d => { return d.x;});
  let xmin = d3.min(superDataset[0], d => { return d.x;});
  let ymin = d3.min(superDataset[0], d => { return d.y;});
  let ymax = d3.max(superDataset[0], d => { return d.y;});

  for(let i = 1; i < superDataset.length; i++){
    const dataset = superDataset[i]
    const localxmin = d3.min(dataset, d => { return d.x;});
    xmin = Math.min(xmin, localxmin);
    const localymin = d3.min(dataset, d => { return d.y;});
    ymin = Math.min(ymin, localymin);
    const localxmax = d3.max(dataset, d => { return d.x;});
    xmax = Math.max(xmax, localxmax);
    const localymax = d3.max(dataset, d => { return d.y;});
    ymax = Math.max(ymax, localymax);
  }

  const limits = {
    'xmin': xmin,
    'xmax': xmax,
    'ymin': ymin,
    'ymax': ymax
  }
  return(limits);
}

export const constructRegExp = text => {
  const vectorLoops = text.split(" ");
  const length = vectorLoops.length;
  let stringRegExp = "";
  if(length === 1){
    stringRegExp = vectorLoops[0];
  }

  if(length > 1) {
    for(let i = 0; i < length; i++){
      if(i < length - 1){
        stringRegExp += `${vectorLoops[i]}|`;
      } else {
        stringRegExp += `${vectorLoops[i]}`
      }
    }
  }
  return(stringRegExp);
}

import {Library} from '@observablehq/stdlib/dist/stdlib.js';

export const ramp = (color, n = 512) => {
  const library = new Library();
  const canvas = library.DOM.canvas(n, 1);
  const context = canvas.getContext("2d");
  canvas.style.margin = "0 -14px";
  canvas.style.width = "calc(100% + 28px)";
  canvas.style.height = "40px";
  canvas.style.imageRendering = "pixelated";
  for (let i = 0; i < n; ++i) {
    context.fillStyle = color(i / (n - 1));
    context.fillRect(i, 0, 1, 1);
  }
  return canvas;
}
