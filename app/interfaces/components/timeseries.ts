import * as d3 from 'd3';
import * as ut from "./utilities.ts";

export const drawChart = (options) => {
  const xScale = d3.scaleLinear()
                   .domain([options.xmin, options.xmax])
                   .range([0 + options.padding, options.w - options.padding]);

  const yScale = d3.scaleLinear()
                   .domain([options.ymin, options.ymax])
                   .range([options.h - options.padding, 0 + options.padding]);

  //Define X axis
  const xAxis = d3.axisBottom()
                  .scale(xScale);

  //Define Y axis
  const yAxis = d3.axisLeft()
                  .scale(yScale);

  //Create SVG element
  const svg = d3.select(`#${options.parentId}`)
                .append("svg")
                .attr("id", options.svgId)
                .attr("class", "ts-chart")
                .attr("width", options.w)
                .attr("height", options.h);

  //Define clipping clip-path
  svg.append("clipPath")
   .attr("id", "chart-area")
   .append("rect")
   .attr("x", options.padding)
   .attr("y", options.padding)
   .attr("width", options.w - options.padding)
   .attr("height", options.h - options.padding);

  //Create X axis
  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + (options.h - options.padding) + ")")
    .call(xAxis);

  //Create y axis
  svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(" + options.padding + ", 0)")
    .call(yAxis);
}
/**
 * Options is a JSON object with the following properties:
 * padding, w, h, dataset, title, finishTime
 */
export const drawLine = (options) => {
  if (typeof options.circles === 'undefined') {
    options.circle = false;
  }

  if (options.circles === true){
    const optionsCircles = {
      'dataset': options.dataset,
      'finishTime': options.finishTime,
      'padding': options.padding,
      'w': options.w,
      'h': options.h,
      'svgId': options.svgId,
    }
    drawDataPoints(optionsCircles);
  }

  const superDataset = options.dataset;
  const extremePoints = ut.findExtremePoints(superDataset);
  const xmax = Math.max(options.finishTime, extremePoints.xmax);
  const xScale = d3.scaleLinear()
                   .domain([0, xmax])
                   .range([0 + options.padding, options.w - options.padding]);

  const yScale = d3.scaleLinear()
                   .domain([0, extremePoints.ymax])
                   .range([options.h - options.padding, 0 + options.padding]);

  //Define X axis
  const xAxis = d3.axisBottom()
                  .scale(xScale);

  //Define Y axis
  const yAxis = d3.axisLeft()
                  .scale(yScale)
                  .ticks(4);

  const svg = d3.select(`#${options.svgId}`);

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

  const title = `<h6 class = "text-center">${options.title}</h6>`;
  svg.append("foreignObject")
    .attr("width", options.w)
    .attr("height", options.padding)
    .append("xhtml:body")
    .html(title)

  for(let i = 0; i < superDataset.length; i++) {
    let durationTime, colorLine, classLine;
    if(i === superDataset.length - 1){
      durationTime = options.lineDuration;
      colorLine = 'steelblue';
      classLine = options.classLine + ' lastSF';
    } else {
      durationTime = 0;
      colorLine = '#cccccc';
      classLine = options.classLine
    }
    const dataset = superDataset[i];
    const line = d3.line()
                   .x(d => { return xScale(d.x); })
                   .y(d => { return yScale(d.y);});

    const path = svg.append("path")
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

export const drawDataPoints = options => {
  console.log("hola circles");
  console.log(options.dataset);
  const dataset = options.dataset;
  const xmax = Math.max(options.finishTime,
    d3.max(dataset, d => { return d.x;}));
  const xScale = d3.scaleLinear()
                   .domain([0, xmax])
                   .range([0 + options.padding, options.w - options.padding]);

  const yScale = d3.scaleLinear()
                   .domain([0,
                     d3.max(dataset, d => { return d.y;})])
                   .range([options.h - options.padding, 0 + options.padding]);

  const svg = d3.select(`#${options.svgId}`);

  const circle = svg.selectAll('.tsPoints')
                   .data(dataset)
                   .enter()
                   .append('circle')
                   .attr('class', 'tsPoint')
                   .attr("cx", d => {
                     return(xScale(d.x));
                   })
                   .attr("cy", d => {
                     return(yScale(d.y));
                   })
                   .attr("r", 2);
}

function makeid() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
