//Stocks and stocksAndFlows
const $ = require('jquery');
import * as d3 from 'd3';

export const drawStock = (options) => {
  const svg = d3.select(`#${options.svgId}`)

  svg.append('rect')
    .attr('x', options.xmin)
    .attr('y', options.ymin)
    .attr('height', options.ylength)
    .attr('width', options.xlength)
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('id', options.idStock);

  const n = options.initialValue;
  const dataset = [];
  for(let i = 0; i < n; i++){
    let x = Math.random() * options.xlength + options.xmin;
    let y = Math.random() * options.ylength + options.ymin;
    let pair = [x, y];
    dataset[i] = pair
  }

  svg.selectAll(`#${options.classFilling}`)
    .data(dataset)
    .enter()
    .append('circle')
    .attr('class', options.classFilling)
    .attr('cx', d => d[0])
    .attr('cy', d => d[1])
    .attr('r', 1)
    .attr('opacity', 0.25)
}
/**
 * options is an object
 * attribute xDestStcStart is the first x coordinate of the stock at the flow's end
 * attribute xDestStcLength is the horizontal length of the stock at the flow's end
 * attribute yDestStcStart is the first y coordinate of the stock at the flow's end
 * attribute yDestStcLength is the vertical length of the stock at the flow's end
 * attribute xOrgnStcEnd is the last x coordinate of the stock at the flow's beginning
 * attribute yOrgnStcStart is the first y coordinate of the stock at the flow's beginning
 * attribute flowyStart is the first y coordinate of the flow
 * attribute flowHeight is the y distance between flows's upper & lower lines
 */
export const animateFlow = (options) => {
  // The function that actually does the moving:
  const translateX = function(path){
   const l = path.getTotalLength();
   return function(d, i, a){
     return function(t){
       const p = path.getPointAtLength(t * l);
       return p.x;
     }
   }
  }

  const translateY = function(path){
   const l = path.getTotalLength();
   return function(d, i, a){
     return function(t){
       const p = path.getPointAtLength(t * l);
       return p.y;
     }
   }
  }
  const padding = 3;
  const svg = d3.select(`#${options.svgId}`);
  const nTransition = options.totalFlow;
  d3.selectAll(`.${options.from}`)
      .each(function (d, i) {
        if(i < nTransition){
            const xStart = parseFloat(d3.select(this).attr('cx'));
            const yStart = parseFloat(d3.select(this).attr('cy'));
            const startingPoint = {'x':xStart, 'y': yStart};
            const xIntmdt1 = options.xOrgnStcEnd;
            //const yIntmdt1 = options.yOrgnStcStart;
            const yIntmdt1 = options.flowyStart + padding  + Math.random() * (options.flowHeight - (2 * padding))
            const intmdtPoint1 = {'x':xIntmdt1, 'y': yIntmdt1};
            const xIntmdt2 = options.xDestStcStart;
            const yIntmdt2 = yIntmdt1;
            const intmdtPoint2 = {'x':xIntmdt2, 'y': yIntmdt2};
            const xEnd = Math.random() * options.xDestStcLength + options.xDestStcStart;
            const yEnd = Math.random() * options.yDestStcLength + options.yDestStcStart;
            const endPoint = {'x':xEnd, 'y': yEnd};
            const points = [startingPoint, intmdtPoint1, intmdtPoint2, endPoint];
            const line = d3.line()
                           .x(d => { return d.x })
                           .y(d => { return d.y });

            const path = svg.append("path")
                           .datum(points)
                           .attr("d", line)
                           .attr("fill", "none");
                           //.attr("stroke", "black");

            d3.select(this)
              .transition()
              .delay(500)
              .duration(2500)
              .on("start", function() {
                d3.select(this)
                  .attr('r', 3)
              })
              .attrTween("cx", translateX(path.node()))
              .attrTween("cy", translateY(path.node()))
              .on("end", function() {
                d3.select(this)
                  .attr('r', 1)
                  .attr('class', `${options.to}`);
              });
            path.remove();
        }
      });
    //  $('#bRun').prop("disabled", false);;

}

export const drawFlow = (options) => {
  console.log(options);
  const svg = d3.select(`#${options.svgId}`);
  const midpoint = (2 * options.yMin + options.yLength) / 2
  console.log(`yLength: ${options.yLength} + yMin: ${options.yMin} and midpoint: ${midpoint}`)
  svg.append('line') // Upper horizontal line
    .attr('x1', options.xStart) //155
    .attr('y1', midpoint - 10)
    .attr('x2', options.xEnd) //255
    .attr('y2', midpoint - 10)
    .style("stroke", "black");

  svg.append('line') // Lower horizontal line
    .attr('x1', options.xStart) //155
    .attr('y1', midpoint + 10)
    .attr('x2', options.xEnd) //255
    .attr('y2', midpoint + 10)
    .style("stroke", "black");

  svg.append('line') // Left vertical line
    .attr('x1', options.xStart) //155
    .attr('y1', midpoint - 10)
    .attr('x2', options.xStart) //155
    .attr('y2', midpoint + 10)
    .style("stroke", "white")
    .style("stroke-width", 1.5);

  svg.append('line') // Right vertical line
    .attr('x1', options.xEnd) //255
    .attr('y1', midpoint - 10)
    .attr('x2', options.xEnd) //255
    .attr('y2', midpoint + 10)
    .style("stroke", "white")
    .style("stroke-width", 1.5);
}
