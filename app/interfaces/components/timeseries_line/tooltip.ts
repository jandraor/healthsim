import * as d3 from 'd3';
import * as ut from "../utilities.ts";

/**
 * Adds simultaneous tooltips on a faceted timeseries graph
 * @param {Object} options - Function's parameters.
 * @param {string} options.svgId - Id of the svg where the line is located.
 * @param {Object} options.padding - Each key corresponds to left, top, right & bottom paddings in the svg
 * @param {Function} options.xScale - x scale function of line's chart.
 * @param {Function} options.yScale - y scale function of line's chart.
 * @param {Array<Object>} options.dataset - Two-dimension dataset (x & y).
 * @param {number} options.stopTime - Max time the entire run.
 * @param {string} options.classLine - Class of the path element in the DOM.
 */

export const facets = options => {
  const svgId = options.svgId;
  const svg = d3.select(`#${svgId}`);
  const w = parseFloat(svg.attr('width'));
  const h = parseFloat(svg.attr('height'));
  const padding = options.padding;
  const xScale = options.xScale;
  const yScale = options.yScale;
  const dataset = options.dataset;
  const stopTime = options.stopTime;
  const classline = options.classLine;

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
    .attr('class', 'crcTooltip')
    .style('stroke', 'steelblue')
    .style('fill', 'none')
    .style('stroke-width', '1px')
    .style('opacity', '0');

  mouseG.append('text')
    .attr('class', 'txtTooltip')
    .style('opacity', '0')

  const xmax = d3.max(dataset, d => { return d.x;});
  const xLength = xScale(xmax) - xScale(0);
  mouseG.append('rect')
    .attr('width', xLength)
    .attr('height', h - (padding.top + padding.bottom))
    .attr('x', padding.left)
    .attr('y', padding.top)
    .attr('opacity', 0)
    .on('mouseout', () => {
      d3.selectAll('.mouse-line')
        .style('opacity', '0');

      d3.selectAll('.crcTooltip')
        .style('opacity', '0');

      d3.selectAll('.txtTooltip')
        .style('opacity', '0');

      d3.select(svg.node().parentNode)
        .select('.ttpIndicator')
        .remove();
    })
    .on('mouseover', () => {
      d3.selectAll('.mouse-line')
        .style('opacity', '1')

      d3.selectAll('.crcTooltip')
        .style('opacity', '1');

      d3.selectAll('.txtTooltip')
        .style('opacity', '1');

      d3.select(svg.node().parentNode)
        .append('span')
          .attr('class', 'ttpIndicator d-block mt-2 ml-3')
    })
    .on('mousemove', function() {
      //Create custom bisector
      const bisect = d3.bisector(d => { return d.x}).right;
      const mouse = d3.mouse(this);
      const classes = classline.split(" ");
      const selector = classes.map(singleClass => {return `.${singleClass}`})
        .join("");
      d3.selectAll(selector)
        .each(function(d) {
          const lineSVG = this.parentNode.parentNode.id
          const h2 = d3.select(`#${lineSVG}`).attr('height');

          const lineDataPoints  = [
            {'x': mouse[0], 'y': padding.top},
            {'x': mouse[0], 'y': h2 - padding.bottom}
          ]

          const line = d3.line()
                         .x(d => {return d.x})
                         .y(d => {return d.y})
          //
          d3.select(`#ml${lineSVG}`)
            .datum(lineDataPoints)
            .attr('d', line);

          const dataset = d3.select(this).datum();
          const x0 = xScale.invert(mouse[0]);
          const index = bisect(dataset, x0);
          const startDatum = dataset[index - 1];
          const endDatum = dataset[index];

          //Adds an exception when the startDatum is the last value in the dataset
          if(!endDatum) {
            return
          }

          const formattedInd = d3.format(".2f")(x0)

          d3.select(svg.node().parentNode)
            .select('.ttpIndicator')
            .text(`Time: ${formattedInd}`);

          const interpolate = d3.interpolateNumber(startDatum.y, endDatum.y);
          const range = endDatum.x - startDatum.x;
          const valueY = interpolate((x0 - startDatum.x) / range );
          d3.select(`#${lineSVG}`).select('.crcTooltip')
            .attr('cy', yScale(valueY))
            .attr('cx', mouse[0]);

          d3.select(`#${lineSVG}`).select('.txtTooltip')
            .attr('y', yScale(valueY) + 3)
            .attr('x', mouse[0] + 10)
            .text(Math.round(valueY * 100) / 100);
        });
    })
}
