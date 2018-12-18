import * as d3 from 'd3';
import * as ut from './utilities.ts'

export const draw = (data, divId, legend = false) => {
  const margin = {top: 20, right: 10, bottom: 40, left: 100}
  const color = d3.scaleSqrt()
                  .interpolate(() => d3.interpolatePuRd)
                  .domain([0, d3.max(data.values, d => d3.max(d))])

  if (legend === true) {
    const widthLegend =  50;
    const svgLegend = d3.select(`#${divId}`)
      .append('svg')
      .attr('class', 'd-block my-5')
      .style('width', widthLegend)
      .style('height', '10')
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
      .text("Any variable");
  }

  const cellHeight = 50;
  const cellWidth = 50;
  const width = cellWidth * data.time.length ;
  
  const svg = d3.select(`#${divId}`)
                .append('svg')
                .attr('width', width)
                .attr('height', cellHeight * data.names.length + margin.top + margin.bottom);

  const stopTime = d3.max(data.time);

  const xScale = d3.scaleLinear()
    .domain([0, stopTime + 1])
    .rangeRound([margin.left, width - margin.right]);

  const yScale = d3.scaleBand()
    .domain(data.names)
    .rangeRound([margin.top, margin.top + data.names.length * cellHeight])

  svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).tickSize(0))
      .call(g => g.select(".domain").remove());

  svg.append("g")
     .attr("transform", `translate(0,${margin.top})`)
     .call(d3.axisTop(xScale).tickValues(d3.range(0, stopTime + 1)))
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
}
