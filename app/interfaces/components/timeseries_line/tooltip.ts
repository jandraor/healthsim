import * as d3 from 'd3';
import * as ut from "../utilities.ts";

export const add = (svgId, w, h, padding, xScale, yScale, dataset, endTime) => {
  const svg = d3.select(`#${svgId}`);
  const chartType = svgId.replace("svgTS", "");
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
    .attr('id', `ctt${chartType}`)
    .attr('class', 'crcTooltip')
    .style('stroke', 'steelblue')
    .style('fill', 'none')
    .style('stroke-width', '1px')
    .style('opacity', '0');

  mouseG.append('text')
    .attr('id', `ttt${chartType}`)
    .attr('class', 'txtTooltip')
    .style('opacity', '0')

  const xmax = d3.max(dataset, d => { return d.x;});
  const xLength = xScale(xmax) - xScale(0);
  mouseG.append('rect')
    .attr('width', xLength)
    .attr('height', h - 2 * padding)
    .attr('x', padding)
    .attr('y', padding)
    .attr('opacity', 0)
    .on('mouseout', () => {
      d3.selectAll('.mouse-line')
        .style('opacity', '0');

      d3.selectAll('.crcTooltip')
        .style('opacity', '0');

      d3.selectAll('.txtTooltip')
        .style('opacity', '0');
    })
    .on('mouseover', () => {
      d3.selectAll('.mouse-line')
        .style('opacity', '1')

      d3.selectAll('.crcTooltip')
        .style('opacity', '1');

      d3.selectAll('.txtTooltip')
        .style('opacity', '1');
    })
    .on('mousemove', function() {
      //Create custom bisector
      const bisect = d3.bisector(d => { return d.x}).right;
      const mouse = d3.mouse(this);
      d3.selectAll('.lastTS')
        .each(function(d) {
          let h2;
          let typeMouseLine;
          let typeChart;
          const lineClass = d3.select(this).attr('class');
          const patt = RegExp('tsSF');
          const res = patt.test(lineClass);
          if(res === true){
            h2 = 500 * (2 / 3);
            typeMouseLine = 'mlsvgTSSF';
            typeChart = 'SF';
          } else {
            h2 = (500 * (2 / 3)) / 2;
            typeMouseLine = 'mlsvgTSPar';
            typeChart = 'Par';
          }

          const lineDataPoints  = [
            {'x': mouse[0], 'y': padding},
            {'x': mouse[0], 'y': h2 - padding}
          ]

          const line = d3.line()
                         .x(d => {return d.x})
                         .y(d => {return d.y})

          d3.select(`#${typeMouseLine}`)
            .datum(lineDataPoints)
            .attr('d', line);

          const dataset = d3.select(this).datum();
          const extremePoints = ut.findExtremePoints(d3.selectAll(`.ts${typeChart}`).data());

          const xScale = d3.scaleLinear()
                           .domain([0, endTime])
                           .range([0 + padding, w - padding]);

          const yScale = d3.scaleLinear()
                             .domain([0, extremePoints.ymax])
                             .range([h2 - padding, 0 + padding]);

          const x0 = xScale.invert(mouse[0]);
          const index = bisect(dataset, x0);
          const startDatum = dataset[index - 1];
          const endDatum = dataset[index];
          const interpolate = d3.interpolateNumber(startDatum.y, endDatum.y);
          const range = endDatum.x - startDatum.x;
          const valueY = interpolate((x0 - startDatum.x) / range );
          d3.select(`#ctt${typeChart}`)
            .attr('cy', yScale(valueY))
            .attr('cx', mouse[0]);

          d3.select(`#ttt${typeChart}`)
            .attr('y', yScale(valueY) + 3)
            .attr('x', mouse[0] + 10)
            .text(Math.round(valueY * 100) / 100);
        });
    })
}
