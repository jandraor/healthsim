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

export const getContent = (modelId, fetchJSON) => {
  const id = String(modelId)

  switch(id){
    case '1':
     intf1.buildInterface(modelId, fetchJSON);
    break;
  }
}
