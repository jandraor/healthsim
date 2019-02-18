import * as d3 from 'd3';

const twoPi = 2 * Math.PI;

/**
 * Draws an ring diagram on an existing svg.
 * @param {Object} options - Function's parameters.
 * @param {string} options.svg - Id of the svg
 * @param {number} options.width - width of the svg
 * @param {number} options.height - height of the svg
 * @param {string} options.variable - Variable displayed
 * @param {number} options.value - A value between 0 & 1 to be displayed,
 * @param {boolean} options.initNA - Indicates whether the meter is initiated with a NA value
 * @param {number} options.innerRadius - Ring's inner radius
 */

export const initialise = options => {
  if(d3.select(`#${options.svg}`).empty()){
    console.log(`svg ${options.svg} does not exist`);
    return
  };

  const width = options.width;
  const height = options.height;

  const svg = d3.select(`#${options.svg}`)
      .attr('width', width)
      .attr('height', height)
    .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

  const meter  = svg.append('g')
    .attr('class', 'arcMeter');

  const arc = generateArcFunction(options.innerRadius);

  const background = meter.append('path')
      .attr('class', 'background')
      .attr('d', arc.endAngle(twoPi));

  const variableName = meter.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('y', 15)
      .attr('class', 'variableName')
      .text(options.variable);

  const indicatorValue = meter.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('class', 'indValue')
      .attr('y', - 5)

  if(options.initNA) {
    indicatorValue.text('NA');
    return
  }

  if(options.value < 0 ) {
    d3.select(`#${options.svg}`)
        .attr('height', 0)
        .attr('width', 0)
      .selectAll("*").remove();
    console.log('options.value is negative');
    return
  }
  const foreground = meter.append('path')
      .attr('class', 'foreground')
      .attr('d', arc.endAngle(Math.min(twoPi * options.value, twoPi)))

  indicatorValue.text(Math.round(options.value * 100));
}

/**
 * Updates an existing ring diagram.
 * @param {Object} options - Function's parameters.
 * @param {string} options.svg - Id of the svg
 * @param {number} options.value - A value between 0 & 1 to be displayed,
 * @param {number} options.innerRadius - Ring's inner radius
 */

export const update = params => {
  const arc = generateArcFunction(params.innerRadius);

  const svg = d3.select(`#${params.svg}`);
  const foreground = svg.select('.foreground');

  if(!foreground.empty()) {
    foreground.remove();
  }

  const meter  = svg.select('.arcMeter')

  meter.append('path')
      .attr('class', 'foreground')
      .attr('d', arc.endAngle(Math.min(twoPi * params.value, twoPi)))

  svg.select(`.indValue`)
      .text(Math.round(params.value * 100));
}

const generateArcFunction = innerRadius => {
  const arc = d3.arc()
      .startAngle(0)
      .innerRadius(innerRadius)
      .outerRadius(innerRadius + 5);
  return arc
}
