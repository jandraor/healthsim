import * as d3 from 'd3';

/**
 * Add rows of sparkline charts to a table.
 * @param {Object} options - Function's parameters.
 * @param {string} options.tableId - Id of the table that contains sparklines.
 * @param {number} options.height - SVG's height.
 * @param {number} options.width - SVG's width.
 * @param {string} options.variable - Variable's name.
 * @param {string} options.display - Variable's name to be display in the table cell.
 */
export const drawChart = (options) => {
  const tbody = d3.select(`#${options.tableId}`).select('tbody')
  const tr = tbody.append('tr')
               .attr('class', 'py-5')
               .attr('id', `trSL${options.variable}`);
  tr.append('td')
    .html(`<small>${options.display}</small>`)
    .attr('class', 'border-0 py-2');

  const td = tr.append('td').attr('class', 'border-0 py-2');

  const svg = td.append('svg')
                .attr('class', 'svgSparkline')
                .attr('id', `svgSL${options.variable}`)
                .attr('height', options.height)
                .attr('width', options.width)
                .attr('class', 'mx-0 px-0')

  svg.append('rect')
     .attr("x", 0)
     .attr("y", 0)
     .attr("width", options.width)
     .attr("height", options.height)
     .attr("id", `b${options.variable}`)
     .attr("class", "splBackground");
  tr.append('td')
    .text('---')
    .attr('class', 'tdCurVal border-0 text-right');
}

/**
 *options is a JSON object that must have parentId, height, width,
 * padding, dataset, variable, svgId, duration, delay
 *padding paramater must be a JSON object with top, bottom,left and right
 */
export const createSparkline = options => {
  const svg = d3.select(`#svgSL${options.variable}`);
  const rectWidth = parseFloat(svg.select('rect').attr('width'));
  const rectHeight = parseFloat(svg.select('rect').attr('height'));
  const dataset = options.dataset;
  const xScale = d3.scaleLinear()
                   .domain([0, options.stopTime])
                   .range([0, rectWidth - options.radius]);

  const yScale = d3.scaleLinear()
                  .domain(d3.extent(options.dataset, d => { return d.y}))
                  .range([rectHeight - 2, 0 + 2]);

  const sparkline = d3.line()
                      .x(d => { return xScale(d.x)})
                      .y(d => { return yScale(d.y)});

  const path = svg.append('path')
                 .datum(options.dataset)
                 .attr('id', `spl${options.variable}`)
                 .attr('class', 'sparkline')
                 .attr('d', sparkline);

  const totalLength = path.node().getTotalLength();



  path.attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
      .delay(options.delay)
      .duration(options.duration)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);

  const lastValue = Math.round(options.dataset[options.dataset.length - 1].y);
  d3.select(`#trSL${options.variable}`)
      .select('.tdCurVal')
      .transition()
        .delay(options.delay)
        .duration(options.duration)
        .text(lastValue);

    svg.append('circle')
       .transition()
       .delay(options.delay)
       .duration(options.duration)
         .attr('cx', xScale(options.dataset[options.dataset.length - 1].x))
         .attr('cy', yScale(options.dataset[options.dataset.length - 1].y))
         .attr('r', options.radius)
         .attr('class', 'sparkcircle')
         .attr('id', `sc${options.variable}`)
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
