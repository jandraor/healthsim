import * as d3 from 'd3';

/**
 * Draws a bullet graph on an existing SVG.
 * @param {Object} options - Params.
 * @param {string} option.svgId - svg where the bullet is going to be drawn
 * @param {string} options.title - Measure
 * @param {string} options.subtitle - Measure's units
 * @param {number[]} options.ranges - It consists of exactly 3 elements. They should be in descending order. These are the limits, absolute values, of the background rectangles.
 * @param {number} options.measure - Bullet's length
 * @param {boolean} [options.reverse] - If true, the bullet grows leftwards. If false, the bullet rightwards
 */
export const draw = options => {

  if(options.ranges.length != 3){
    console.log(`Ranges' length is not exactly 3`)
    return
  }

  const height = 30;
  const width = 215;
  const margin = {
    'top': 5,
    'left': 75,
    'bottom': 20,
    'right': 10,
  }

  const svg = d3.select(`#${options.svgId}`)
    .attr('class', 'bullet')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

  const  xScale = d3.scaleLinear()
    .domain([0, Math.max(options.ranges[0], options.measure)])
    .range(options.reverse ? [width, 0] : [0, width]);

  const bulWidth = bulletWidth(xScale);

  g.selectAll("rect.range")
    .data(options.ranges)
    .enter()
      .append("rect")
    .attr("class", (d, i) => { return `range s${i}`})
    .attr("width", bulWidth)
    .attr("height", height)
    .attr("x", options.reverse ? xScale : 0);

  const measure = g.append("rect")
    .datum(options.measure)
    .attr("class", "measure")
    .attr("width", bulWidth)
    .attr("x", options.reverse ? xScale : 0)
    .attr("y", height / 3)
    .attr("height", height / 3);

  // Compute the tick format.
  const format = xScale.tickFormat(4, '~s');
  
  // Update the tick groups.
  const tick = g.selectAll("g.tick")
    .data(xScale.ticks(4), function(d) {
      return this.textContent ||format(d);
    })
    .enter()
      .append("g")
    .attr("class", "tick")
    .attr("transform", bulletTranslate(xScale))

  tick.append("line")
    .attr("y1", height)
    .attr("y2", height * 7 / 6)

  tick.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "1em")
    .attr("y", height * 7 / 6)
    .text(format);

  const title = svg.append("g")
    .style("text-anchor", "end")
    .attr("transform", `translate(${margin.left - 6}, ${height / 2})`);

  title.append("text")
    .attr("class", "title")
    .text(options.title);

   title.append("text")
     .attr("class", "subtitle")
     .attr("dy", "1em")
     .text(options.subtitle);
}

const bulletWidth = x => {
  const x0 = x(0);
  return d => {
    return Math.abs(x(d) - x0);
  };
}

const bulletTranslate = x => {
  return function(d) {
    return `translate(${x(d)},0)`;
  };
}

export const clear = svgId => {
  const svg = d3.select(`#${svgId}`)
    .selectAll("*").remove();
}
