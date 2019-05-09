import * as d3 from 'd3';

/**
 * Creates a chart for timeseries on a existing SVG element.
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
    .scale(xScale)

  if(options.xTicks) {
    xAxis.ticks(options.xTicks)
  }


  //Define Y axis
  const yAxis = d3.axisLeft()
    .scale(yScale);

  if(options.yTicks) {
    yAxis.ticks(options.yTicks)
  }

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

  //Title
  if(options.title) {
    svg.append("text")
      .attr("text-anchor", "start")
      .attr("y", 15)
      .attr("x", options.padding.left)
      .text(options.title);
  }
}

export const clear = svgId => {
  d3.select(`#${svgId}`).selectAll('path').remove();
}

export const drawGroup =  options => {
  const margin = {top: 30, right: 15, bottom: 50, left: 50};
  const width = 175;
  const height = width;
  const svg = d3.select(`#${options.divId}`)
    .selectAll("facet")
    .data(options.keys)
    .enter()
      .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr('id', d => {return `svgTSFacet${d.name}`})
    .each(function(data){
      draw({
        'svgId': this.id,
        'width': width,
        'height': height,
        'padding': margin,
        'xmin': 0,
        'xmax': 20,
        'ymin': 0,
        'ymax': 30000,
        'yTicks': 3,
        'xTicks': 3,
        'title': data.name
      });
    });
}
