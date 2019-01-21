import * as d3 from 'd3';

export const draw = options => {
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
