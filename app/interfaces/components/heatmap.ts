import * as d3 from 'd3';
import * as ut from './utilities.ts'

/**
 * Creates a heatmap of a specified div.
 * @param {Object} options - Function's parameters.
 * @param {Object} options.data - Object that contains the information to be represented in the heatmap.
 * @param {string} options.divId - Div's id where the heatmap will be allocated.
 * @param {boolean} [options.legend = false] - Indicates whether a legend is displayed above the heatmap.
 * @param {number} [options.yMax] - Max time the entire run.
 */
export const draw = options => {
  if(!options.data) {
    console.log (`Property 'data' not found`);
    return
  }
  const data = options.data;

  if(!options.divId) {
    console.log (`Property 'divId' not found`);
    return
  }
  const divId = options.divId;

  let yMax;
  if(options.yMax) {
    yMax = options.yMax;
  }

  if(!options.yMax) {
    yMax = d3.max(data.values, d => d3.max(d));
  }

  if(!options.legend) {
    options.legend = false;
  }
  const legend = options.legend;
  const margin = {top: 20, right: 10, bottom: 40, left: 100}
  const color = d3.scaleSqrt()
                  .interpolate(() => d3.interpolatePuRd)
                  .domain([0, yMax])

  if (legend === true) {
    const widthLegend =  500;
    const svgLegend = d3.select(`#${divId}`)
      .append('svg')
      .attr('class', 'd-block mb-4')
      .attr('width', widthLegend)
      .attr('height', '45')
      .style('overflow', 'visible');

    const gLegend = svgLegend.append("g")
      .attr("transform", `translate(${margin.left},20)`)
      .call(d3.axisBottom(color.copy().rangeRound([0, widthLegend])).tickSize(13).ticks(5))
      .call(g => g.selectAll(".tick line").attr("stroke", "#fff"))
      .call(g => g.select(".domain").remove());

    gLegend.insert("image", "*")
      .attr("width", widthLegend)
      .attr("height", 13)
      .attr("preserveAspectRatio", "none")
      .attr("xlink:href", ut.ramp(d3.scaleLinear().interpolate(color.interpolate()).domain([0, 1])).toDataURL());

    gLegend.append("text")
      .attr("class", "caption")
      .attr("y", -6)
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .text("Infected");
  }

  const cellHeight = 35;
  const cellWidth = 35;
  const width = cellWidth * data.time.length ;

  const svg = d3.select(`#${divId}`)
                .append('svg')
                .attr('width', width + margin.left +  margin.right)
                .attr('height', cellHeight * data.names.length + margin.top + margin.bottom);

  const stopTime = d3.max(data.time);

  const xScale = d3.scaleLinear()
    .domain([0, stopTime + 1])
    .rangeRound([margin.left, margin.left + width - margin.right]);

  const yScale = d3.scaleBand()
    .domain(data.names)
    .rangeRound([margin.top, margin.top + data.names.length * cellHeight])

  svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).tickSize(0))
      .call(g => g.select(".domain").remove());

  svg.append("g")
     .attr("transform", `translate(0,${margin.top})`)
     .call(d3.axisTop(xScale).tickValues(d3.range(0, stopTime + 1)).tickFormat(d3.format("0")))
     .call(g => g.select(".domain").remove());

  const row = svg.append("g")
                 .selectAll("g")
                 .data(data.values) //number of states/teams/countries/regions
                 .enter().append("g")
                 .attr("transform", (d, i) => `translate(0,${yScale(data.names[i])})`);

  row.selectAll("rect")
    .data(d => d)
    .enter()
    .append("rect")
      .attr("x", (d, i) => xScale(data.time[i]) + 1)
      .attr("width", (d, i) => xScale(data.time[i] + 1) - xScale(data.time[i]) - 1)
      .attr("height", yScale.bandwidth() - 1)
      .attr('fill', d => isNaN(d) ? "#eee" : d === 0 ? "#fff" : color(d))
    .append('title')
      .text((d, i) => isNaN(d) ? '': Math.round(d))

}
