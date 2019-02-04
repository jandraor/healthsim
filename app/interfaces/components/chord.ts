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
  const width = 550;
  const height = 550;
  const outerRadius = 200;
  const innerRadius = 180;

  const chord = d3.chord()
    .padAngle(0.05)
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

  const svg = d3.select(`#${params.svgId}`)
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [-width / 2, -height / 2, width, height])


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
    .attr('transform', d => {
      const rotation1 = `rotate(${d.angle * 180 / Math.PI - 90})`;
      const translation = `translate(${innerRadius + 40})`;
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
  d3.select(`#${svgId}`).selectAll("*").remove();
}
