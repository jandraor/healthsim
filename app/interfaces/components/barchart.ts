import * as d3 from 'd3';

/**
 * Set width, height to an existing SVG & display a message
 * @param {Object} params - Function's parameters.
 * @param {string} options.svgId - Id of a existing svg
 * @param {number} options.width - width of the svg
 * @param {number} options.height - height of the svg
 */
export const chart = params => {

  const svg = d3.select(`#${params.svgId}`);

  svg
    .attr('width', params.width)
    .attr('height', params.height)
    .attr('class', 'border')
      .append('text')
    .attr('x', '50%')
    .attr('y', '50%')
    .attr('text-anchor', 'middle')
    .text('No data available');
}
/**
 *==============================================================================
 */
export const draw = params => {
  const padding = {
    'top': 30,
    'right': 20,
    'bottom': 10,
    'left': 50,
  }
  const svg = d3.select(`#${params.svgId}`)
      .attr('class', '')
  const width = parseFloat(svg.attr('width'));
  const height = parseFloat(svg.attr('height'));
  const data = params.data

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.y)])
    .range([0 + padding.left, width - padding.right ]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.x))
    .range([padding.top, height - padding.bottom])
    .padding(0.1)

  const xAxis = g => g
    .attr('transform', `translate(0, ${padding.top})`)
    .call(d3.axisTop(xScale)
      .ticks(5)
      .tickFormat(d3.format('~s')))
    .call(g => g.select('.domain').remove());

  const yAxis = g => g
    .attr('transform', `translate(${padding.left}, 0)`)
    .call(d3.axisLeft(yScale).tickSizeOuter(0))


  svg.append('g')
      .attr('fill', '#B6C3CC')
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
      .attr('x', xScale(0))
      .attr('y', d =>  yScale(d.x))
      .attr('width', d => xScale(d.y) - xScale(0))
      .attr('height', yScale.bandwidth());

  svg.append('g')
    .call(xAxis);

  svg.append('g')
    .call(yAxis);
}

export const clear = svgId => {
  const svg = d3.select(`#${svgId}`)
    .selectAll("*").remove();
}

export const empty = (svgId, message) => {
  const svg = d3.select(`#${svgId}`);

  svg
    .attr('class', 'border')
      .append('text')
    .attr('x', '50%')
    .attr('y', '50%')

    .attr('text-anchor', 'middle')
    .text(message);
}
