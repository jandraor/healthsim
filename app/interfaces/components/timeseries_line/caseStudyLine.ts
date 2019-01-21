import * as d3 from 'd3';
import * as datapoints from './datapoints.ts';

export const draw = options => {
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
    datapoints.draw(optionsCircles);
}
