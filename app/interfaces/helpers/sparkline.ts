import * as d3 from 'd3';

//padding paramater must be an object with top, bottom,left and right properties
export const createSparkline = (elemId, height, width,
                                 padding, dataset, variable) => {
  console.log("Hola sparkline");
  const svg = d3.select("#" + elemId)
                .append("svg")
                    .attr("class", "svgSparkline")
                    .attr("height", height)
                    .attr("width", width);

  const xScale = d3.scaleLinear()
                   .domain([0,
                     d3.max(dataset, d => { return d.x;})])
                   .range([0, width - padding.right]);

  const yScale = d3.scaleLinear()
                  .domain(d3.extent(dataset, d => { return d.y}))
                  .range([25 - padding.bottom, 0 + padding.top]);

  const sparkline = d3.line()
                      .x(d => { return xScale(d.x)})
                      .y(d => { return yScale(d.y)});

  const path = svg.append('path')
                 .datum(dataset)
                 .attr('class', 'sparkline')
                 .attr('d', sparkline);

  const totalLength = path.node().getTotalLength();

  svg.append('circle')
    .attr('id', `sc${variable}`)
    .attr('class', 'sparkcircle')
    .attr('cx', xScale(dataset[dataset.length - 1].x))
    .attr('cy', yScale(dataset[dataset.length - 1].y))
    .attr('r', 2)
    .style("opacity", 0);

  const lastValue = Math.round(dataset[dataset.length - 1].y);

  svg.append("text")
    .attr('id', `t${variable}`)
    .attr("class", "text-value")
    .attr("x", width - padding.right + 10)
    .attr("y", (0 + padding.top + 25 - padding.bottom) / 2)
    .style("opacity", 0)
    .text(`${lastValue} ${variable}`);

  path.attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
      .delay(2200)
      .duration(1)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);

  d3.selectAll(`#sc${variable}`)
    .transition()
    .delay(2200)
    .duration(1)
    .style("opacity", 1);

  d3.selectAll(`#t${variable}`)
    .transition()
        .delay(2200)
        .duration(1)
        .style("opacity", 1);
}
