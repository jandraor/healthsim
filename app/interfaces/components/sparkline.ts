import * as d3 from 'd3';

/**
 *options is a JSON object that must have parentId, height, width,
 * padding, dataset, variable, svgId, duration, delay
 *padding paramater must be a JSON object with top, bottom,left and right
 */
export const createSparkline = options => {
  const svg = d3.select(`#${options.parentId}`)
                .append('svg')
                .attr("class", "svgSparkline")
                .attr('id', options.svgId)
                .attr("height", options.height)
                .attr("width", options.width);
  const dataset = options.dataset;
  const xmax = Math.max(options.finishTime,
    d3.max(dataset, d => { return d.x;}));
  const xScale = d3.scaleLinear()
                   .domain([0, xmax])
                   .range([0, options.width - options.padding.right]);

  const yScale = d3.scaleLinear()
                  .domain(d3.extent(options.dataset, d => { return d.y}))
                  .range([options.height - options.padding.bottom, 0 + options.padding.top]);
  const r = 2;
  svg.append('rect')
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", options.width - options.padding.right + r)
    .attr("height", options.height)
    .attr("id", `b${options.variable}`)
    .attr("class", "splBackground")
    .style("opacity", 0);

  const sparkline = d3.line()
                      .x(d => { return xScale(d.x)})
                      .y(d => { return yScale(d.y)});

  const path = svg.append('path')
                 .datum(options.dataset)
                 .attr('id', `spl${options.variable}`)
                 .attr('class', 'sparkline')
                 .attr('d', sparkline);

  const totalLength = path.node().getTotalLength();

  svg.append('circle')
    .attr('id', `sc${options.variable}`)
    .attr('class', 'sparkcircle')
    .attr('cx', xScale(options.dataset[options.dataset.length - 1].x))
    .attr('cy', yScale(options.dataset[options.dataset.length - 1].y))
    .attr('r', r)
    .style("opacity", 0);

  const lastValue = Math.round(options.dataset[options.dataset.length - 1].y);

  svg.append("text")
    .attr('id', `t${options.variable}`)
    .attr("class", "text-value")
    .attr("x", options.width - options.padding.right + 10)
    .attr("y", ((0 + options.padding.top + 25 - options.padding.bottom) / 2) + 5)
    .style("opacity", 0)
    .text(`${lastValue} ${options.variable}`);

  path.attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
      .delay(options.delay)
      .duration(options.duration)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);

  d3.select(`#sc${options.variable}`)
    .transition()
    .delay(options.delay)
    .duration(options.duration)
    .style("opacity", 1);

  d3.select(`#t${options.variable}`)
    .transition()
        .delay(options.delay)
        .duration(options.duration)
        .style("opacity", 1);

  d3.select(`#b${options.variable}`)
    .transition()
    .delay(options.delay)
    .duration(options.duration)
    .style("opacity", 1);
}

export const addOnClickEvent = (svgId, drawline, options) => {
  d3.select(`#${svgId}`)
    .on("click", () => {
      const tsSVG = d3.select(`#${options.svgId}`);

      tsSVG
        .select('foreignObject')
        .remove();

      tsSVG
        .selectAll('.tsSF')
        .remove();

      drawline(options);
    });
}
