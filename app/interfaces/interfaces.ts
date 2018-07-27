const Slider = require("bootstrap-slider");
import * as d3 from 'd3';
import * as sl from "./helpers/sparkline.ts";
import * as timeseries from "./helpers/timeseries.ts";
const w = 800 * (2 / 3); //Width
const h = 500 * (2 / 3); //Heigth
const padding = 40;

export const buildSliders = () => {
  const InfectedSlider = new Slider("#slInfected");
  InfectedSlider.on("slide", sliderValue => {
    document.getElementById("lInfected").textContent = sliderValue;
  });

  const ContactRateSlider = new Slider("#slContactRate");
  ContactRateSlider.on("slide", sliderValue => {
    document.getElementById("lContactRate").textContent = sliderValue;
  });

  const InfectivitySlider = new Slider("#slInfectivity");
  InfectivitySlider.on("slide", sliderValue => {
    document.getElementById("lInfectivity").textContent = sliderValue;
  });

  const RecoveryDelaySlider = new Slider("#slRecoveryDelay");
  RecoveryDelaySlider.on("slide", sliderValue => {
    document.getElementById("lRecoveryDelay").textContent = sliderValue;
  });
}

export const drawTimeSeries = () => {
  //parameters timeseries
  let options = {
    'xmin': 0,
    'xmax': 100,
    'ymin': 0,
    'ymax': 8,
    'w': w,
    'h': h,
    'padding': padding,
    'parentId': 'mainTS',
    'elemId': 'tsSF'
  }
  timeseries.drawChart(options);

  //parameters timeseries
  options = {
    'xmin': 0,
    'xmax': 100,
    'ymin': 0,
    'ymax': 8,
    'w': w,
    'h': h / 2,
    'padding': padding,
    'parentId': 'mainTS',
    'elemId': 'tsPar'
  }
  timeseries.drawChart(options);
}

export const runButton = (model_id, fetchJSON)  => {
  d3.select("#bRun")
    .on("click", async() => {
      const tslines = d3.selectAll(".tsline")
      tslines.remove();
      const I = document.getElementById("lInfected").textContent;
      const cr = document.getElementById("lContactRate").textContent;
      const i = document.getElementById("lInfectivity").textContent;
      const rd = document.getElementById("lRecoveryDelay").textContent;
      const params = `?I=${I}&cr=${cr}&i=${i}&rd=${rd}`;
      const url = `/simulate/model/${model_id}/${params}`;
      const dataset = await fetchJSON(url);

      const rowConverter = d => {
          return {
            time: parseFloat(d.time),
            sSusceptible: parseFloat(d.sSusceptible),
            sInfected: parseFloat(d.sInfected),
            sRecovered: parseFloat(d.sRecovered),
            basicReproductionNumber: parseFloat(d.basicReproductionNumber),
            netReproductionNumber: parseFloat(d.netReproductionNumber)
          }
      }

      const arrayLength = dataset.length;

      for (let i = 0; i < arrayLength; i++) {
        dataset[i] = rowConverter(dataset[i]);
      }

      //Draw timeseries in the stock and flow chart
      let x = dataset.map(d => d.time);
      let y = dataset.map(d => d.sSusceptible);
      let length = x.length;

      let tsDataset = [];
      for (let i = 0; i < length; i++) {
        let temp = {
          'x' : x[i],
          'y' : y[i]
        };
        tsDataset.push(temp);
      }

      let options = {
        'dataset': tsDataset,
        'svgId': "tsSF",
        'padding': padding,
        'w': w,
        'h': h
      }
      timeseries.drawLine(options);

      //Draw timeseries in the parameter chart
      x = dataset.map(d => d.time);
      y = dataset.map(d => d.netReproductionNumber);
      length = x.length;

      tsDataset = [];
      for (let i = 0; i < length; i++) {
        let temp = {
          'x' : x[i],
          'y' : y[i]
        };
        tsDataset.push(temp);
      }

      options = {
        'dataset': tsDataset,
        'svgId': "tsPar",
        'padding': padding,
        'w': w,
        'h': h / 2
      }
      timeseries.drawLine(options);

      /*
      Sparklines
      */

      d3.selectAll(".svgSparkline").remove();
      const elemId = 'auxTS';
      //Infected sparkline
      let slWidth = 250;
      let slHeight = 25
      let slPadding = {
        'top': 2,
        'left': 0,
        'right': 130,
        'bottom': 2
       }
      //Susceptible sparkline
      let slVariable = "Susceptible";
      x = dataset.map(d => d.time);
      y = dataset.map(d => d.sSusceptible);
      length = x.length;

      let slDataset = [];
      for (let i = 0; i < length; i++) {
        let temp = {
          'x' : x[i],
          'y' : y[i]
        };
        slDataset.push(temp);
      }

      sl.createSparkline(elemId, slHeight, slWidth,
                           slPadding, slDataset, slVariable);

      //Infected sparkline
      slVariable = "Infected";
      x = dataset.map(d => d.time);
      y = dataset.map(d => d.sInfected);
      length = x.length;

      slDataset = [];
      for (let i = 0; i < length; i++) {
        let temp = {
          'x' : x[i],
          'y' : y[i]
        };
        slDataset.push(temp);
      }

      sl.createSparkline(elemId, slHeight, slWidth,
                           slPadding, slDataset, slVariable);
      //Recovered sparkline

      slVariable = "Recovered";
      x = dataset.map(d => d.time);
      y = dataset.map(d => d.sRecovered);
      length = x.length;
      slDataset = [];
      for (let i = 0; i < length; i++) {
        let temp = {
          'x' : x[i],
          'y' : y[i]
         };
        slDataset.push(temp);
      }
      sl.createSparkline(elemId, slHeight, slWidth,
                           slPadding, slDataset, slVariable);
    });
}
