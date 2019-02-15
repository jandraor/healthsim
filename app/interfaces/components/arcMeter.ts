import * as d3 from 'd3';

export const initialise = params => {
  if(d3.select(`#${params.svg}`).empty()){
    console.log(`svg ${params.svg} does not exist`);
    return
  };
  const width = params.width;
  const height = params.height;
  console.log(`width: ${width}`);
  console.log(`height: ${height}`)
  const svg = d3.select(`#${params.svg}`)
      .attr('width', width)
      .attr('height', height)
    .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

  const meter  = svg.append('g')
    .attr('class', 'arcMeter')

  const arc = d3.arc()
      .startAngle(0)
      .innerRadius(37)
      .outerRadius(45);

  const twoPi = 2 * Math.PI;

  const background = meter.append('path')
      .attr('class', 'background')
      .attr('d', arc.endAngle(twoPi));

  const foreground = meter.append('path')
      .attr('class', 'foreground')
      .attr('d', arc.endAngle(twoPi * 0.25))

  const variableName = meter.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('y', 15)
      .attr('class', 'variableName')
      .text('% Infected')

  const indicatorValue = meter.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('class', 'indValue')
      .attr('y', - 5)
      .text('5')

}
