import * as d3 from 'd3';
import * as ut from "../utilities.ts";
import * as datapoints from './datapoints.ts';
import * as tooltip from './tooltip.ts';

/**
 * Draws a time series line on an existing chart & updates both axis
 * @param {Object} options - Function's parameters.
 * @param {string} options.svgId - Id of the svg of the existing chart
 * @param {Array<Array<Object>>} options.superDataset - A vector of datasets. Each element is a dataset. Each dataset is an array of two-key objects.
 * @param {Object} options.padding - Each key corresponds to left, top, right & bottom paddings in the svg
 * @param {number} options.finishTime - Max time the entire run.
 * @param {number} options.lineDuration - Animation time of the line.
 * @param {string} options.idLine - Id of the path element in the DOM.
 * @param {string} options.classLine - Class of the path element in the DOM.
 * @param {boolean} options.tooltip - Indicates whether a tooltip will be added to the timeseries line.
 * @param {number} [options.yMax] - Maximum value displayed in the y-axis.
 */
export const draw = options => {
  const svg = d3.select(`#${options.svgId}`);
  const superDataset = options.superDataset;
  const extremePoints = ut.findExtremePoints(superDataset);
  const csPoints = svg.selectAll(`.csPoint`); //Case study points
  const nPoints = csPoints.size();
  let ymax;
  if(nPoints > 0){
    const pointsDataset = csPoints.data();
    csPoints.remove();
    const localYMax = d3.max(pointsDataset, d => {return d.y});
    ymax = Math.max(extremePoints.ymax, localYMax)
    const optionsCircles = {
      'dataset': pointsDataset,
      'finishTime': options.finishTime,
      'padding': options.padding,
      'w': options.w,
      'h': options.h,
      'svgId': options.svgId,
      'ymax': ymax
    }
    datapoints.draw(optionsCircles);
  } else {
    ymax = extremePoints.ymax;
  }

  if(options.yMax) {
    ymax = options.yMax;
  }
  
  const width = svg.attr('width');
  const height = svg.attr('height');

  const xScale = d3.scaleLinear()
                   .domain([0, options.finishTime])
                   .range([0 + options.padding.left, width - options.padding.right]);

  const yScale = d3.scaleLinear()
                   .domain([0, ymax])
                   .range([height - options.padding.bottom, 0 + options.padding.top]);

  //Define X axis
  const xAxis = d3.axisBottom()
                  .scale(xScale);

  //Define Y axis
  const yAxis = d3.axisLeft()
                  .scale(yScale)
                  .ticks(4);

  //Update X axis
  svg.select(".x-axis")
    .transition()
    .duration(1000)
    .call(xAxis);

  //Update y axis
  svg.select(".y-axis")
    .transition()
    .duration(1000)
    .call(yAxis);

  for(let i = 0; i < superDataset.length; i++) {
    let durationTime, colorLine, classLine;
    const dataset = superDataset[i];
    if(i === superDataset.length - 1){
      durationTime = options.lineDuration;
      colorLine = 'steelblue';
      classLine = options.classLine + ' lastTS';
      if(options.tooltip === true) {
        tooltip.add(options.svgId, width, height, options.padding, xScale, yScale, dataset, options.finishTime);
      }
    } else {
      durationTime = 0;
      colorLine = '#cccccc';
      classLine = options.classLine
    }
    const line = d3.line()
                   .x(d => { return xScale(d.x); })
                   .y(d => { return yScale(d.y);});

    const path = svg.select('.gTS')
                      .append("path")
                      .datum(dataset)
                      .attr('id', `${options.idLine}${makeid()}`)
                      .attr("class", classLine)
                      .attr("d", line)
                      .attr("stroke", colorLine);

    const totalLength = path.node().getTotalLength();
    path.attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
        .duration(durationTime)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);
  }
}

function makeid() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
