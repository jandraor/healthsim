import * as d3 from 'd3';

/**
 * Creates a chart for drawing timeseries on a SVG element.
 * @param {Object} options - Function's parameters.
 * @param {string} options.svgId - Id of the svg
 * @param {number} options.width - width of the svg
 * @param {number} options.height - height of the svg
 * @param {Object} options.padding - Each key corresponds to left, top, right & bottom paddings in the svg
 * @param {number} options.xmin - Min value to be displayed in the x-axis
 * @param {number} options.xmax - Max value to be displayed in the x-axis
 * @param {number} options.ymin - Min value to be displayed in the y-axis
 * @param {number} options.ymax - Max value to be displayed in the y-axis
 */
export const draw = options => {
  const xScale = d3.scaleLinear()
                   .domain([options.xmin, options.xmax])
                   .range([0 + options.padding.left, options.width - options.padding.right]);

  const yScale = d3.scaleLinear()
                   .domain([options.ymin, options.ymax])
                   .range([options.height - options.padding.bottom, 0 + options.padding.top]);

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
   .attr("x", options.padding.left)
   .attr("y", options.padding.top)
   .attr("width", options.width - (options.padding.left + options.padding.right))
   .attr("height", options.height - (options.padding.top + options.padding.bottom));

  //Create X axis
  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + (options.height - options.padding.bottom) + ")")
    .call(xAxis);

  //Create y axis
  svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(" + options.padding.left + ", 0)")
    .call(yAxis);

  //Timeseries are drawn on this element
  svg.append('g')
     .attr('class', 'gTS');
}

export const clear = svgId => {
  d3.select(`#${svgId}`).selectAll('path').remove();
}
