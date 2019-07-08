import * as d3 from 'd3';

/**
 * Add a row of sparkline chart to a table.
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
    .attr('class', 'tdCurVal border-0 text-right')
    .attr('id', `tdCurVal-${options.variable}`);
}

 /**
  * Draws a sparkline on a existing table row.
  * @param {Object} options - Function's parameters.
  * @param {string} options.variable - Name of the variable. There must exist an SVG with id = `svgSl'variable'`
  * @param {Object[]} options.dataset - Array of two-key objects. Keys are x & y.
  * @param {number} options.stopTime - Max time for an entire run or last step in a run.
  * @param {number} options.radius - Length of circle's radius in the sparkline.
  * @param {number} options.duration - Duration of sparkline's animation.
  * @param {number} options.delay - Time to start animation.
  * @param {number[]} options.domain - An optional array of length 2 with min & max domains
  */
export const createSparkline = options => {
  const svg = d3.select(`#svgSL${options.variable}`);
  const rectWidth = parseFloat(svg.select('rect').attr('width'));
  const rectHeight = parseFloat(svg.select('rect').attr('height'));
  const dataset = options.dataset;
  const xScale = d3.scaleLinear()
                   .domain([0, options.stopTime])
                   .range([0 + options.radius, rectWidth - options.radius]);
  let domain;
  if(options.domain) {
    domain = options.domain;
  }
  if(!options.domain) {
    domain = d3.extent(options.dataset, d => { return d.y});
  }
  const yScale = d3.scaleLinear()
                  .domain(domain)
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

/**
 * Sets a value on the current value cell.
 * @param {string} variable - Variable's name.
 * @param {number} value - Value to be inserted in the current value cell.
 */
export const setInitValue = (variable, value) => {
  const svg = d3.select(`#svgSL${variable}`)
  svg.select('path').remove();
  svg.select('circle').remove();
  const tdCurVal = d3.select(`#tdCurVal-${variable}`);
  tdCurVal.text(value);
}

export const clearChart = variable => {
  const svg = d3.select(`#svgSL${variable}`);
  svg.select('path').remove();
  svg.select('circle').remove();
}

/**
 * Draws the chart & labels for a sparkline.
 * @param {Object} options - Function's parameters.
 * @param {string} options.svgId - Id of the svg of the existing chart
 * @param {string} [options.sparklineId] -
 * @param {Object} options.width -
 * @param {number} [options.width.title = 0] - Extra width allocated for title
 * @param {number} options.height -
 * @param {string} [options.initValue = '-----'] -
 * @param {string} [options.title] -
 * @param {number} [options.xPos = 0] -
 * @param {number} [options.yPos = 0] -
 * @param {boolean} [options.standAlone = true] -
 */
export const drawChart2 = options => {
  const width = options.width;
  const widthTitle = width.title === undefined ? 0 : width.title

  const standAlone = options.standAlone === undefined ? true : options.standAlone;

  const svg = d3.select(`#${options.svgId}`);

  if(standAlone === true) {
    svg
        .attr('width', width.sparkline + widthTitle)
        .attr('height', options.height)
  }

  const sparkLineId = options.sparklineId === undefined ? '' : options.sparklineId;

  const sparklineGroup = svg
    .append('g')
      .attr('id', sparkLineId)
      .attr('class', 'sparklineGraph');


  const xPos = options.xPos === undefined ? 0 : options.xPos;
  const yPos = options.yPos === undefined ? 0 : options.yPos;

  const sparkline = sparklineGroup.append('rect')
      .attr("x", xPos)
      .attr("y", yPos)
      .attr("width", width.sparkline)
      .attr("height", options.height)
      .attr("class", "splBackground");

  const initValue = options.initValue || '-----';

  sparklineGroup.append('text')
      .attr('x', xPos + width.sparkline + 5)
      .attr('y', yPos + options.height / 2 + 5)
      .attr('class', 'spIndicator')
      .text(initValue)

  if(options.title != undefined) {
    sparklineGroup.append('text')
        .attr('x', width.sparkline + 55)
        .attr('y', options.height / 2 + 5)
        .attr('font-size', '9px')
        .attr('class', 'spTitle')
        .text(options.title)
  }
}

/**
 * Draws a sparkline an existing SVG.
 * @param {Object} options - Function's parameters.
 * @param {string} options.svgId - Id of the SVG which contains the sparkline chart
 * @param {string} options.sparklineId -
 * @param {Object[]} options.dataset - Array of two-key objects. Keys are x & y.
 * @param {number} options.stopTime - Max time for an entire run or last step in a run.
 * @param {number} options.radius - Length of circle's radius in the sparkline.
 * @param {boolean} [options.standAlone = true] -
 * @param {number[]} options.yDomain - An optional array of length 2 with min & max domains
 */

export const drawLine = options => {
  const svg = d3.select(`#${options.svgId}`);
  let rect, spSelection;
  const standAlone = options.standAlone === undefined ? true : options.standAlone;

  if(standAlone === true) {
    spSelection = svg.select('.sparklineGraph')
    rect = spSelection.select('rect');
  }

  if(standAlone === false) {
    spSelection = svg.select(`#${options.sparklineId}`)
    rect = svg.select(`#${options.sparklineId}`).select('rect');
  }

  const rectWidth = parseFloat(rect.attr('width'));
  const rectHeight = parseFloat(rect.attr('height'));
  const dataset = options.dataset;
  const xPos = parseFloat(rect.attr('x'));
  const yPos = parseFloat(rect.attr('y'));

  const xScale = d3.scaleLinear()
                   .domain([0, options.stopTime])
                   .range([xPos + options.radius, xPos + rectWidth - options.radius]);

  let yDomain;
  if(options.yDomain) {
    yDomain = options.yDomain;
  }

  if(!options.yDomain) {
    yDomain = d3.extent(options.dataset, d => { return d.y});
  }

  const yScale = d3.scaleLinear()
      .domain(yDomain)
      .range([yPos + rectHeight - options.radius,  yPos + options.radius]);

  const sparkline = d3.line()
      .x(d => { return xScale(d.x)})
      .y(d => { return yScale(d.y)});

  const path = spSelection.append('path')
      .datum(options.dataset)
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

  let lastValue = Math.round(options.dataset[options.dataset.length - 1].y);
  let prefixValue;

  if(options.format) {
    lastValue = d3.format(options.format)(lastValue);
  }

  if(options.prefix) {
    prefixValue = `${options.prefix} ${lastValue}`;
  }

  spSelection.select('.spIndicator')
    .transition()
      .delay(options.delay)
      .duration(options.duration)
      .text(prefixValue || lastValue);

  spSelection.append('circle')
    .transition()
      .delay(options.delay)
      .duration(options.duration)
      .attr('cx', xScale(options.dataset[options.dataset.length - 1].x))
      .attr('cy', yScale(options.dataset[options.dataset.length - 1].y))
      .attr('r', options.radius)
      .attr('class', 'sparkcircle')
}

export const clearChart2 = svgId => {
  const svg = d3.select(`#${svgId}`);
  svg.select('path').remove();
  svg.select('circle').remove();
}
