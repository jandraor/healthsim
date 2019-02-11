import * as d3 from 'd3';

/**
 * Draws a chord diagram on an existing SVG
 * @param {Object} params - Function's parameters.
 * @param {string} params.svgId - Id of the svg of the existing chart
 * @param {Array<number[]>} params.dataset - JSON representation of a matrix
 * @param {Array<string[]>} params.labels - Arcs' labels
 */
export const draw = params => {
  const labels = params.labels;

  const outerRadius = 170;
  const innerRadius = 160;

  const chord = d3.chord()
    .padAngle(0.15)
    .sortSubgroups(d3.descending);

  const arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const ribbon = d3.ribbon()
    .radius(innerRadius);

  const color = d3.scaleOrdinal()
    .domain(d3.range(10))
    .range(['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a']);

  const chords = chord(params.dataset);

  const svg = d3.select(`#${params.svgId}`);
  const width = parseInt(svg.attr('width'));
  const height = parseInt(svg.attr('height'));

  svg
    .attr('class', '')
    .attr('viewBox', [-width * (1 / 2), -height * (1 / 2), width, height]);

  const group = svg.append('g')
    .selectAll('g')
    .data(chords.groups)
    .enter()
    .append('g');

  group.append('path')
    .attr('fill', d => color(d.index))
    .attr('stroke', d => d3.rgb(color(d.index)).darker())
    .attr('d', arc);

  group.append('text')
    .each(d => { d.angle = (d.startAngle + d.endAngle) / 2})
    .attr('class', "arcLabel")
    .attr('dy', ".35em")
    .attr('transform', d => {
      const rotation1 = `rotate(${d.angle * 180 / Math.PI - 90})`;
      const translation = `translate(${innerRadius + 30})`;
      const rotation2 = d.angle > Math.PI ? 'rotate(180)': '';
      console.log(`${rotation1} ${translation} ${rotation2}`);
      return  `${rotation1} ${translation} ${rotation2}`
    })
    .attr('text-anchor', d => d.angle > Math.PI ? 'end': null)
    .text((d, i) => labels[i])

  svg.append('g')
    .attr('fill-opacity', 0.67)
    .selectAll('path')
      .data(chords)
      .enter()
      .append('path')
      .attr('d', ribbon)
      .attr('fill', d => color(d.target.index))
      .attr('stroke', d => d3.rgb(color(d.target.index)).darker())
}

export const clear = svgId => {
  const svg = d3.select(`#${svgId}`)
  const width = parseInt(svg.attr('width'));
  const height = parseInt(svg.attr('height'));

  svg.attr('viewBox', [0, 0, width, height])
    .selectAll("*").remove();
}

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
