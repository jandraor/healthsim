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
  fillStock(options.svgId, options.label, options.initialValue);
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
  const translateX = function(classPath){
   return function(d, i, a){
     const path = d3.select(`#${classPath}${i}`).node();
     const l = path.getTotalLength();
     return function(t){
       const p = path.getPointAtLength(t * l);
       return p.x;
     }
   }
  }

  const translateY = function(classPath){
    return function(d, i, a){
      const path = d3.select(`#${classPath}${i}`).node();
      const l = path.getTotalLength();
      return function(t){
        const p = path.getPointAtLength(t * l);
        return p.y;
     }
   }
  }
  const padding = 3;
  const svg = d3.select(`#${options.svgId}`);
  const nTransition = options.totalFlow;
  const circles = d3.selectAll(`.crc${options.from}`)
    .filter((d, i) => {
      return i < nTransition;
    });
  if(circles.size() > 0) {
    circles
      .each(function (d,i) { //Creates paths
        const xStart = parseFloat(d3.select(this).attr('cx'));
        const yStart = parseFloat(d3.select(this).attr('cy'));
        const startingPoint = {'x':xStart, 'y': yStart};
        const xIntmdt1 = options.xOrgnStcEnd;
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
          .attr("fill", "none")
          .attr('id', `pathCircle${options.from}${options.to}${i}`)
          .attr('class', `pathCircle${options.from}${options.to}`)
          //.attr('stroke', 'black');
      })
      .transition()
        .duration(options.duration)
        .delay(options.delay)
        .on('start', function() {
          d3.select(this)
            .attr('r', 3);
        })
        .on("end", function() {
          d3.select(this)
            .attr('r', 1)
            .attr('class', `crc${options.to}`);
          d3.select(`#lblStc${options.from}`)
            .text(`${options.from}: ${options.newValueFrom}`);
          d3.select(`#lblStc${options.to}`)
            .text(`${options.to}: ${options.newValueTo}`);
          d3.selectAll(`.pathCircle${options.from}${options.to}`).remove();
          d3.select('#indTime').text(options.time);
          if (options.callback){
            options.callback();
          }
        })
        .attrTween("cx", translateX(`pathCircle${options.from}${options.to}`))
        .attrTween("cy", translateY(`pathCircle${options.from}${options.to}`))
        // This code is only for verification
        // Works with div 'verificationSF'
        // .transition()
        //   .duration(0)
        //   .on('start', () => {
        //     d3.select('#lCntSusceptible').text(d3.selectAll('.crcSusceptible').size());
        //     d3.select('#lCntInfected').text(d3.selectAll('.crcInfected').size());
        //     d3.select('#lCntRecovered').text(d3.selectAll('.crcRecovered').size());
          // });
  }
  if(circles.size() === 0) {
    d3.select('#indTime')
      .transition()
        .duration(options.duration)
        .text(options.time);
    if (options.callback){
      options.callback();
    }
  }

}

export const drawFlow = (options) => {
  const svg = d3.select(`#${options.svgId}`);
  const midpoint = (2 * options.yMin + options.yLength) / 2
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

/**
 * Fill a stock with circles.
 * @param {string} svgId - The id the svg element where the stock is located.
 * @param {string} variable - The name of the stock.
 * @param {number} n - The number of circles.
 * @param {number} delay - Time to circles to appear.
 */

export const fillStock = (svgId, variable, n, delay = 0) => {
  const dataset = [];
  const stock = d3.select(`#stc${variable}`);
  const xlength = parseFloat(stock.attr('width'));
  const ylength = parseFloat(stock.attr('height'));
  const xmin = parseFloat(stock.attr('x'));
  const ymin = parseFloat(stock.attr('y'));
  for(let i = 0; i < n; i++){
    let randomNumber = Math.random();
    let x = randomNumber * xlength + xmin;
    let randomNumber2 = Math.random();
    let y = randomNumber2 * ylength + ymin;
    let pair = [x, y];
    dataset[i] = pair
  }

  const svg = d3.select(`#${svgId}`);

  svg.selectAll(`.crc${variable}`)
    .data(dataset)
    .enter()
    .append('circle')
    .attr('cx', d => d[0])
    .attr('cy', d => d[1])
    .transition()
      .duration(0)
      .delay(delay)
      .attr('class', `crc${variable}`)
      .attr('r', 1)
      .attr('opacity', 0.25);

  svg.append('text')
     .attr('id', `lblStc${variable}`)
     .attr('class', 'lblStc')
     .attr('x', xmin + 5)
     .attr('y', ymin - 15)
     .transition()
       .duration(0)
       .delay(delay)
       .text(`${variable}: ${n}`);
}

export const drawStock2 = options => {
  const xLength = 60;
  const yLength = 60;
  const flowWidth = 10;
  const xCenter = options.x;
  const yCenter = options.y;

  const stockData = {
    'xLength': xLength,
    'yLength': yLength,
    'flowWidth': flowWidth,
    'xCenter': xCenter,
    'yCenter': yCenter,
  }

  const svg = d3.select(`#${options.svgId}`);
  const g = svg.append('g')
       .attr('id', options.stockId)
       .datum(stockData)

  const label = g.append('text')
      .attr('x', xCenter)
      .attr('y', yCenter)
      .attr('text-anchor', 'middle')
      .attr('font-size', '9px')
      .style('fill', '#505050')

  if(typeof(options.title) === 'string') {
    label.text(options.title)
  }



  if(Array.isArray(options.title)) {
    label.attr('y', yCenter + 8)
      .attr('font-size', '8px');
    options.title.forEach((word, i) => {
      label.append('tspan')
          .attr('x', xCenter)
          .attr('dy', 10 * Math.pow(-1, i + 1))
          .text(word)
    })
  }



  const line = d3.line()
    .x(d => { return d.x; })
    .y(d => { return d.y;});

  if(!options.leftFlow && options.topFlow && options.rightFlow && options.bottomFlow){
    const points1 = [
      {'x': xCenter - (flowWidth / 2), 'y': yCenter - (yLength / 2)},
      {'x': xCenter - (xLength / 2), 'y': yCenter - (yLength / 2)},
      {'x': xCenter - (xLength / 2), 'y': yCenter + (yLength / 2)},
      {'x': xCenter - (flowWidth / 2), 'y': yCenter + (yLength / 2)},
    ];

    g.append("path")
        .datum(points1)
        .attr("d", line)
        .attr('class', 'stockSegment');

    const points2 = [
      {'x': xCenter + (flowWidth / 2), 'y': yCenter - (yLength / 2)},
      {'x': xCenter + (xLength / 2), 'y': yCenter - (yLength / 2)},
      {'x': xCenter + (xLength / 2), 'y': yCenter - (flowWidth / 2)},
    ];

    g.append("path")
        .datum(points2)
        .attr("d", line)
        .attr('class', 'stockSegment');

    const points3 = [
          {'x': xCenter + (xLength / 2), 'y': yCenter + (flowWidth / 2)},
          {'x': xCenter + (xLength / 2), 'y': yCenter + (yLength / 2)},
          {'x': xCenter + (flowWidth / 2), 'y': yCenter + (yLength / 2)},
        ];

    g.append("path")
        .datum(points3)
        .attr("d", line)
        .attr('class', 'stockSegment');
  }

  if(options.leftFlow && options.topFlow && options.rightFlow && !options.bottomFlow){

    const points1 = getSegment4(xCenter, yCenter, xLength, yLength, flowWidth);

    g.append("path")
        .datum(points1)
        .attr("d", line)
        .attr('class', 'stockSegment');

    const points2 = [
      {'x': xCenter + (flowWidth / 2), 'y': yCenter - (yLength / 2)},
      {'x': xCenter + (xLength / 2), 'y': yCenter - (yLength / 2)},
      {'x': xCenter + (xLength / 2), 'y': yCenter - (flowWidth / 2)},
    ];

    g.append("path")
        .datum(points2)
        .attr("d", line)
        .attr('class', 'stockSegment');

    const points3 = getSegment1(xCenter, yCenter, xLength, yLength, flowWidth);

    g.append("path")
        .datum(points3)
        .attr("d", line)
        .attr('class', 'stockSegment');
  }

  if(options.leftFlow && !options.topFlow && options.rightFlow && options.bottomFlow ){
    const points1 = getSegment2(xCenter, yCenter, xLength, yLength, flowWidth);

    g.append("path")
        .datum(points1)
        .attr("d", line)
        .attr('class', 'stockSegment');

    const points2 = [
      {'x': xCenter + (xLength / 2), 'y': yCenter + (flowWidth / 2)},
      {'x': xCenter + (xLength / 2), 'y': yCenter + (yLength / 2)},
      {'x': xCenter + (flowWidth / 2), 'y': yCenter + (yLength / 2)},
    ];

    g.append("path")
        .datum(points2)
        .attr("d", line)
        .attr('class', 'stockSegment');

    const points3 = getSegment6(xCenter, yCenter, xLength, yLength, flowWidth);

    g.append("path")
        .datum(points3)
        .attr("d", line)
        .attr('class', 'stockSegment');
  }

  if(options.leftFlow && !options.topFlow && options.rightFlow && !options.bottomFlow){
    const points1 = getSegment2(xCenter, yCenter, xLength, yLength, flowWidth);

    g.append("path")
        .datum(points1)
        .attr("d", line)
        .attr('class', 'stockSegment');


    const points2 = getSegment1(xCenter, yCenter, xLength, yLength, flowWidth);

    g.append("path")
        .datum(points2)
        .attr("d", line)
        .attr('class', 'stockSegment');
  }

  if(options.leftFlow && !options.topFlow && !options.rightFlow && !options.bottomFlow ){
    const points = getSegment3(xCenter, yCenter, xLength, yLength, flowWidth);

    g.append("path")
        .datum(points)
        .attr("d", line)
        .attr('class', 'stockSegment');
  }

  if(options.leftFlow && options.topFlow && !options.rightFlow && options.bottomFlow){
    const points1 = getSegment4(xCenter, yCenter, xLength, yLength, flowWidth);

    g.append("path")
        .datum(points1)
        .attr("d", line)
        .attr('class', 'stockSegment');

    const points2 = getSegment5(xCenter, yCenter, xLength, yLength, flowWidth);

    g.append("path")
        .datum(points2)
        .attr("d", line)
        .attr('class', 'stockSegment');

    const points3 = getSegment6(xCenter, yCenter, xLength, yLength, flowWidth);

    g.append("path")
        .datum(points3)
        .attr("d", line)
        .attr('class', 'stockSegment');
  }

  if(options.leftFlow && !options.topFlow && !options.rightFlow && options.bottomFlow ){
    const points1 = getSegment7(xCenter, yCenter, xLength, yLength, flowWidth);

    g.append("path")
        .datum(points1)
        .attr("d", line)
        .attr('class', 'stockSegment');

    const points2 = getSegment6(xCenter, yCenter, xLength, yLength, flowWidth);

    g.append("path")
        .datum(points2)
        .attr("d", line)
        .attr('class', 'stockSegment');
  }
}

// Generates the bottom-half segment for stocks with left & right flows,
// and no bottom flow

const getSegment1 = (xCenter, yCenter, xLength, yLength, flowWidth) => {
  const points = [
    {'x': xCenter + (xLength / 2), 'y': yCenter + (flowWidth / 2)},
    {'x': xCenter + (xLength / 2), 'y': yCenter + (yLength / 2)},
    {'x': xCenter - (xLength / 2), 'y': yCenter + (yLength / 2)},
    {'x': xCenter - (xLength / 2), 'y': yCenter + (flowWidth / 2)},
  ];

  return points
}

// Generates the top-half segment for stocks with left & right flows,
// and no flow on the top

const getSegment2 = (xCenter, yCenter, xLength, yLength, flowWidth) => {
  const points = [
    {'x': xCenter - (xLength / 2), 'y': yCenter - (flowWidth / 2)},
    {'x': xCenter - (xLength / 2), 'y': yCenter - (yLength / 2)},
    {'x': xCenter + (xLength / 2), 'y': yCenter - (yLength / 2)},
    {'x': xCenter + (xLength / 2), 'y': yCenter - (flowWidth / 2)},
  ];
  return points
}

//Stock with left flow
const getSegment3 = (xCenter, yCenter, xLength, yLength, flowWidth) => {

  const points = [
    {'x': xCenter - (xLength / 2), 'y': yCenter - (flowWidth / 2)},
    {'x': xCenter - (xLength / 2), 'y': yCenter - (yLength / 2)},
    {'x': xCenter + (xLength / 2), 'y': yCenter - (yLength / 2)},
    {'x': xCenter + (xLength / 2), 'y': yCenter + (yLength / 2)},
    {'x': xCenter - (xLength / 2), 'y': yCenter + (yLength / 2)},
    {'x': xCenter - (xLength / 2), 'y': yCenter + (flowWidth / 2)},
  ];

  return points;
}

//Top-left quarter of a stock with left & top flows
const getSegment4 = (xCenter, yCenter, xLength, yLength, flowWidth) => {
  const points = [
    {'x': xCenter - (xLength / 2), 'y': yCenter - (flowWidth / 2)},
    {'x': xCenter - (xLength / 2), 'y': yCenter - (yLength / 2)},
    {'x': xCenter - (flowWidth / 2), 'y': yCenter - (yLength / 2)},
  ];

  return points;
}

// Right-half segment of a stock with top & bottom flows
const getSegment5 = (xCenter, yCenter, xLength, yLength, flowWidth) => {
  const points = [
    {'x': xCenter + (flowWidth / 2), 'y': yCenter - (yLength / 2)},
    {'x': xCenter + (xLength / 2), 'y': yCenter - (yLength / 2)},
    {'x': xCenter + (xLength / 2), 'y': yCenter + (yLength / 2)},
    {'x':  xCenter + (flowWidth / 2), 'y': yCenter + (yLength / 2)},
  ];

  return points;
}

//Bottom-left segment of a stock with left & bottom flows
const getSegment6 = (xCenter, yCenter, xLength, yLength, flowWidth) => {
  const points = [
    {'x': xCenter - (flowWidth / 2), 'y': yCenter + (yLength / 2)},
    {'x': xCenter - (xLength / 2), 'y': yCenter + (yLength / 2)},
    {'x': xCenter - (xLength / 2), 'y': yCenter + (flowWidth / 2)},
  ];

  return points;
}

//Top half & bottom-right segments of a stock with left & bottom flows
const getSegment7 = (xCenter, yCenter, xLength, yLength, flowWidth) => {
  const points = [
    {'x': xCenter - (xLength / 2), 'y': yCenter - (flowWidth / 2)},
    {'x': xCenter - (xLength / 2), 'y': yCenter - (yLength / 2)},
    {'x': xCenter + (xLength / 2), 'y': yCenter - (yLength / 2)},
    {'x': xCenter + (xLength / 2), 'y': yCenter + (yLength / 2)},
    {'x': xCenter + (flowWidth / 2), 'y': yCenter + (yLength / 2)},
  ];

  return points
}

export const drawFlow2 = options => {
  const svg = d3.select(`#${options.svgId}`);

  const g = svg.append('g')
       .attr('id', options.flowId);

  const originStock = d3.select(`#${options.originStock}`).datum();
  const destinationStock = d3.select(`#${options.destinationStock}`).datum();

  if(options.flowType === 'regular'){
    const line1 = {
      'x1' : originStock.xCenter + (originStock.xLength / 2),
      'y1' : originStock.yCenter - (originStock.flowWidth / 2),
      'x2' : destinationStock.xCenter - (destinationStock.xLength / 2),
      'y2' : destinationStock.yCenter - (destinationStock.flowWidth / 2)
    }

    g.append('line')
        .style("stroke", "black")
        .attr("x1", line1.x1)
        .attr("y1", line1.y1)
        .attr("x2", line1.x2)
        .attr("y2", line1.y2);

    const line2 = {
      'x1' : originStock.xCenter + (originStock.xLength / 2),
      'y1' : originStock.yCenter + (originStock.flowWidth / 2),
      'x2' : destinationStock.xCenter - (destinationStock.xLength / 2),
      'y2' : destinationStock.yCenter + (destinationStock.flowWidth / 2)
    }

    g.append('line')
        .style("stroke", "black")
        .attr("x1", line2.x1)
        .attr("y1", line2.y1)
        .attr("x2", line2.x2)
        .attr("y2", line2.y2);
  }

  if(options.flowType === "bent") {

    const line = d3.line()
      .x(d => { return d.x; })
      .y(d => { return d.y;});

    if(originStock.yCenter > destinationStock.yCenter) {

      const segment1 = [
        {
          'x': originStock.xCenter - (originStock.flowWidth / 2),
          'y': originStock.yCenter - (originStock.yLength / 2)
        },
        {
          'x': originStock.xCenter - (originStock.flowWidth / 2),
          'y': destinationStock.yCenter - (destinationStock.flowWidth / 2),
        },
        {
          'x': destinationStock.xCenter - (destinationStock.xLength / 2),
          'y': destinationStock.yCenter - (destinationStock.flowWidth / 2)
        },
      ];

      g.append("path")
          .datum(segment1)
          .attr("d", line)
          .attr('class', 'flowSegment');

      const segment2 = [
        {
          'x': originStock.xCenter + (originStock.flowWidth / 2),
          'y': originStock.yCenter - (originStock.yLength / 2)
        },
        {
          'x': originStock.xCenter + (originStock.flowWidth / 2),
          'y': destinationStock.yCenter + (destinationStock.flowWidth / 2),
        },
        {
          'x': destinationStock.xCenter - (destinationStock.xLength / 2),
          'y': destinationStock.yCenter + (destinationStock.flowWidth / 2)
        },
      ];

      g.append("path")
          .datum(segment2)
          .attr("d", line)
          .attr('class', 'flowSegment');
    }

    if(originStock.yCenter < destinationStock.yCenter ) {

      const segment1 = [
        {
          'x': originStock.xCenter - (originStock.flowWidth / 2),
          'y': originStock.yCenter + (originStock.yLength / 2)
        },
        {
          'x': originStock.xCenter - (originStock.flowWidth / 2),
          'y': destinationStock.yCenter + (destinationStock.flowWidth / 2),
        },
        {
          'x': destinationStock.xCenter - (destinationStock.xLength / 2),
          'y': destinationStock.yCenter + (destinationStock.flowWidth / 2)
        },
      ];

      g.append("path")
          .datum(segment1)
          .attr("d", line)
          .attr('class', 'flowSegment');

      const segment2 = [
        {
          'x': originStock.xCenter + (originStock.flowWidth / 2),
          'y': originStock.yCenter + (originStock.yLength / 2)
        },
        {
          'x': originStock.xCenter + (originStock.flowWidth / 2),
          'y': destinationStock.yCenter - (destinationStock.flowWidth / 2),
        },
        {
          'x': destinationStock.xCenter - (destinationStock.xLength / 2),
          'y': destinationStock.yCenter - (destinationStock.flowWidth / 2)
        },
      ];

      g.append("path")
          .datum(segment2)
          .attr("d", line)
          .attr('class', 'flowSegment');
    }
  }

  if(options.flowType === "double-bent"){

    const line = d3.line()
      .x(d => { return d.x; })
      .y(d => { return d.y;});

    const segment1 = [
      {
        'x': originStock.xCenter - (originStock.flowWidth / 2),
        'y': originStock.yCenter - (originStock.yLength / 2)
      },
      {
        'x': originStock.xCenter - (originStock.flowWidth / 2),
        'y': (originStock.yCenter + destinationStock.yCenter) / 2  - (originStock.flowWidth / 2),
      },
      {
        'x': destinationStock.xCenter - (destinationStock.flowWidth / 2),
        'y': (originStock.yCenter + destinationStock.yCenter) / 2  - (originStock.flowWidth / 2),
      },
      {
        'x': destinationStock.xCenter - (destinationStock.flowWidth / 2),
        'y': destinationStock.yCenter + (destinationStock.yLength / 2)
      },
    ];

    g.append("path")
        .datum(segment1)
        .attr("d", line)
        .attr('class', 'flowSegment');


    const segment2 = [
      {
        'x': originStock.xCenter + (originStock.flowWidth / 2),
        'y': originStock.yCenter - (originStock.yLength / 2)
      },
      {
        'x': originStock.xCenter + (originStock.flowWidth / 2),
        'y': (originStock.yCenter + destinationStock.yCenter) / 2  + (originStock.flowWidth / 2),
      },
      {
        'x': destinationStock.xCenter + (destinationStock.flowWidth / 2),
        'y': (originStock.yCenter + destinationStock.yCenter) / 2  + (originStock.flowWidth / 2),
      },
      {
        'x': destinationStock.xCenter + (destinationStock.flowWidth / 2),
        'y': destinationStock.yCenter + (destinationStock.yLength / 2)
      },
    ];

    g.append("path")
        .datum(segment2)
        .attr("d", line)
        .attr('class', 'flowSegment');

  }
}
