const $ = require('jquery');
import * as d3 from 'd3';
import * as ut from "./utilities.ts";

/**
 * Creates a chart for drawing timeseries on a SVG element.
 * @param {Object} options - Function's parameters.
 * @param {string} options.svgId - Id of the svg
 * @param {number} options.width - width of the svg
 * @param {number} options.height - height of the svg
 * @param {number} options.padding - left, top, right & bottom paddings in the svg
 * @param {number} options.xmin - Min value to be displayed in the x-axis
 * @param {number} options.xmax - Max value to be displayed in the x-axis
 * @param {number} options.ymin - Min value to be displayed in the y-axis
 * @param {number} options.ymax - Max value to be displayed in the y-axis
 */
export const drawChart = (options) => {
  const xScale = d3.scaleLinear()
                   .domain([options.xmin, options.xmax])
                   .range([0 + options.padding, options.width - options.padding]);

  const yScale = d3.scaleLinear()
                   .domain([options.ymin, options.ymax])
                   .range([options.height - options.padding, 0 + options.padding]);

  //Define X axis
  const xAxis = d3.axisBottom()
                  .scale(xScale);

  //Define Y axis
  const yAxis = d3.axisLeft()
                  .scale(yScale);

  //Set attributes to SVG element
  const svg = d3.select(`#${options.svgId}`)
    .attr("width", options.width)
    .attr("height", options.height);

  //Define clipping clip-path
  svg.append("clipPath")
   .attr("id", "chart-area")
   .append("rect")
   .attr("x", options.padding)
   .attr("y", options.padding)
   .attr("width", options.width - options.padding)
   .attr("height", options.height - options.padding);

  //Create X axis
  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + (options.height - options.padding) + ")")
    .call(xAxis);

  //Create y axis
  svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(" + options.padding + ", 0)")
    .call(yAxis);

  //Timeseries are drawn on this element
  svg.append('g')
     .attr('class', 'gTS');
}
/**
 * Options is a JSON object with the following properties:
 * padding, w, h, dataset, title, finishTime
 */
export const drawLine = (options) => {
  const svg = d3.select(`#${options.svgId}`);
  const superDataset = options.dataset;
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
    drawDataPoints(optionsCircles);
  } else {
    ymax = extremePoints.ymax;
  }

  const xScale = d3.scaleLinear()
                   .domain([0, options.finishTime])
                   .range([0 + options.padding, options.w - options.padding]);

  const yScale = d3.scaleLinear()
                   .domain([0, ymax])
                   .range([options.h - options.padding, 0 + options.padding]);

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
      addToolTip(options.svgId, options.w, options.h, options.padding, xScale, yScale, dataset, options.finishTime);
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

export const drawDataPoints = options => {
  const dataset = options.dataset;
  const xmax = Math.max(options.finishTime,
    d3.max(dataset, d => { return d.x;}));
  const xScale = d3.scaleLinear()
                   .domain([0, options.finishTime])
                   .range([0 + options.padding, options.w - options.padding]);

  const yScale = d3.scaleLinear()
                   .domain([0, options.ymax])
                   .range([options.h - options.padding, 0 + options.padding]);

  const svg = d3.select(`#${options.svgId}`);

  const circle = svg.selectAll('.tsPoints')
                   .data(dataset)
                   .enter()
                   .append('circle')
                   .attr('class', 'csPoint')
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

export const addToolTip = (svgId, w, h, padding, xScale, yScale, dataset, endTime) => {
  const svg = d3.select(`#${svgId}`);
  const chartType = svgId.replace("svgTS", "");
  svg.selectAll('.mouse-over-effects').remove();
  const mouseG = svg.append('g')
                   .attr('class', 'mouse-over-effects')

  mouseG.append('path')
        .attr('class', 'mouse-line')
        .attr('id', `ml${svgId}`)
        .style('stroke', 'black')
        .style('stroke-width', '1px')
        .style('opacity', '0');

  mouseG.append('circle')
    .attr('r', 7)
    .attr('id', `ctt${chartType}`)
    .attr('class', 'crcTooltip')
    .style('stroke', 'steelblue')
    .style('fill', 'none')
    .style('stroke-width', '1px')
    .style('opacity', '0');

  mouseG.append('text')
    .attr('id', `ttt${chartType}`)
    .attr('class', 'txtTooltip')
    .style('opacity', '0')

  const xmax = d3.max(dataset, d => { return d.x;});
  const xLength = xScale(xmax) - xScale(0);
  mouseG.append('rect')
    .attr('width', xLength)
    .attr('height', h - 2 * padding)
    .attr('x', padding)
    .attr('y', padding)
    .attr('opacity', 0)
    .on('mouseout', () => {
      d3.selectAll('.mouse-line')
        .style('opacity', '0');

      d3.selectAll('.crcTooltip')
        .style('opacity', '0');

      d3.selectAll('.txtTooltip')
        .style('opacity', '0');
    })
    .on('mouseover', () => {
      d3.selectAll('.mouse-line')
        .style('opacity', '1')

      d3.selectAll('.crcTooltip')
        .style('opacity', '1');

      d3.selectAll('.txtTooltip')
        .style('opacity', '1');
    })
    .on('mousemove', function() {
      //Create custom bisector
      const bisect = d3.bisector(d => { return d.x}).right;
      const mouse = d3.mouse(this);
      d3.selectAll('.lastTS')
        .each(function(d) {
          let h2;
          let typeMouseLine;
          let typeChart;
          const lineClass = d3.select(this).attr('class');
          const patt = RegExp('tsSF');
          const res = patt.test(lineClass);
          if(res === true){
            h2 = 500 * (2 / 3);
            typeMouseLine = 'mlsvgTSSF';
            typeChart = 'SF';
          } else {
            h2 = (500 * (2 / 3)) / 2;
            typeMouseLine = 'mlsvgTSPar';
            typeChart = 'Par';
          }

          const lineDataPoints  = [
            {'x': mouse[0], 'y': padding},
            {'x': mouse[0], 'y': h2 - padding}
          ]

          const line = d3.line()
                         .x(d => {return d.x})
                         .y(d => {return d.y})

          d3.select(`#${typeMouseLine}`)
            .datum(lineDataPoints)
            .attr('d', line);

          const dataset = d3.select(this).datum();
          const extremePoints = ut.findExtremePoints(d3.selectAll(`.ts${typeChart}`).data());

          const xScale = d3.scaleLinear()
                           .domain([0, endTime])
                           .range([0 + padding, w - padding]);

          const yScale = d3.scaleLinear()
                             .domain([0, extremePoints.ymax])
                             .range([h2 - padding, 0 + padding]);

          const x0 = xScale.invert(mouse[0]);
          const index = bisect(dataset, x0);
          const startDatum = dataset[index - 1];
          const endDatum = dataset[index];
          const interpolate = d3.interpolateNumber(startDatum.y, endDatum.y);
          const range = endDatum.x - startDatum.x;
          const valueY = interpolate((x0 - startDatum.x) / range );
          d3.select(`#ctt${typeChart}`)
            .attr('cy', yScale(valueY))
            .attr('cx', mouse[0]);

          d3.select(`#ttt${typeChart}`)
            .attr('y', yScale(valueY) + 3)
            .attr('x', mouse[0] + 10)
            .text(Math.round(valueY * 100) / 100);
        });
    })
}

export const drawLineCaseStudy = (options) => {
  const xScale = d3.scaleLinear()
                   .domain([0, options.finishTime])
                   .range([0 + options.padding, options.w - options.padding]);

  const ymax = d3.max(options.dataset, d => {return d.y});

  const yScale = d3.scaleLinear()
                   .domain([0, ymax])
                   .range([options.h - options.padding, 0 + options.padding]);
  //Define X axis
  const xAxis = d3.axisBottom()
                  .scale(xScale);
  //Define Y axis
  const yAxis = d3.axisLeft()
                  .scale(yScale)
                  .ticks(4);

  const svg = d3.select(`#${options.svgId}`)

  //Update X axis
  svg.select(".x-axis")
     .transition()
     .duration(1000)
     .call(xAxis)

  //Update Y axis
  svg.select(".y-axis")
     .transition()
     .duration(1000)
     .call(yAxis)

  const line = d3.line()
                 .x(d => { return xScale(d.x)})
                 .y(d => { return yScale(d.y)})

  const path = svg.select('.gTS')
                  .append('path')
                  .datum(options.dataset)
                  .attr('class', 'tsLine tsSF tsCaseStudy')
                  .attr('d', line);



    const optionsCircles = {
      'dataset': options.dataset,
      'finishTime': options.finishTime,
      'padding': options.padding,
      'w': options.w,
      'h': options.h,
      'svgId': options.svgId,
      'ymax': ymax,
    }
    drawDataPoints(optionsCircles);
}
