import * as d3 from 'd3';
import * as ut from "../utilities.ts";
import * as timeseries from "../timeseries.ts";
import * as sl from "../sparkline.ts";

export const build = (model_id, fetchJSON)  => {
  const w = 800 * (2 / 3); //Width
  const h = 500 * (2 / 3); //Heigth
  const padding = 40;

  d3.select("#bRun")
    .on("click", async() => {
      $('#varValueMode').text('run');
      const tslines = d3.selectAll(".tsLine")
      tslines.remove();
      const params = ut.getParameters(String(model_id));
      const paramsUrl = ut.concatenateParameters(params);
      const url = `/simulate/model/${model_id}/${paramsUrl}`;
      const rawDataset = await fetchJSON(url);
      const dataset = ut.parseDataset(rawDataset, String(model_id));
      console.table(dataset);

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
        'h': h,
        'title': 'Susceptible',
        'finishTime': 20,
        'lineDuration': 2000,
        'idLine': 'SFline',
        'classLine': 'tsLine',
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
        'h': h / 2,
        'title': 'Net reproduction number',
        'finishTime': 20,
        'lineDuration': 2000,
        'idLine': 'parLine',
        'classLine': 'tsLine',
      }
      timeseries.drawLine(options);

      /*
      Run button - Sparklines
      */
      d3.selectAll(".svgSparkline").remove();
      const parentId = 'divSL';

      let splWidth = 250;
      let splHeight = 25
      let splPadding = {
        'top': 2,
        'left': 0,
        'right': 130,
        'bottom': 2
       }

       const variableList = [
         {'name': 'sSusceptible', 'display': 'Susceptible'},
         {'name': 'sInfected', 'display': 'Infected'},
         {'name': 'sRecovered', 'display': 'Recovered'},
         {'name': 'IR', 'display': 'Infection-Rate'},
         {'name': 'RR', 'display': 'Recovery-Rate'}]

      let arrayLength = variableList.length;

      for (let i = 0; i < arrayLength; i++) {
        let splVariable = variableList[i].display;
        x = dataset.map(d => d.time);
        y = dataset.map(d => d[variableList[i].name]);
        length = x.length;
        let splDataset = [];

        for (let i = 0; i < length; i++) {
          let temp = {
            'x' : x[i],
            'y' : y[i]
          };
          splDataset.push(temp);
        }

        let svgSparkLineId = `splSVG${splVariable}`;
        const optionsCrtSpl = {
          'parentId' : parentId,
          'height'   : splHeight,
          'width'    : splWidth,
          'padding'  : splPadding,
          'dataset'  : splDataset,
          'variable' : splVariable,
          'svgId'    : svgSparkLineId,
          'duration' : 1,
          'delay'    : 2000,
          'finishTime': 20,
        };

        sl.createSparkline(optionsCrtSpl);

        let optionsClickEvent = {
          'dataset': splDataset,
          'svgId': "tsSF",
          'padding': padding,
          'w': w,
          'h': h,
          'title': splVariable,
          'finishTime': 20,
          'lineDuration': 2000,
          'idLine': 'SFline',
          'classLine': 'tsLine',
        }
        sl.addOnClickEvent(svgSparkLineId, timeseries.drawLine,
          optionsClickEvent);
      }
    });
}
