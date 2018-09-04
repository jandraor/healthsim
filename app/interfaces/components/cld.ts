import * as d3 from 'd3';
import * as ut from "./utilities.ts";

export const drawCLD = (divID) => {
  const w = 750;
  const h = 400;
  const r = 10;

  const dataset = {
     nodes: [{"id":0,"variable":"Susceptible","x":55,"y":290,"type":"stock","lengthRect":95},{"id":1,"variable":"Contact Probability","x":60,"y":125,"type":"auxiliary","lengthRect":0},{"id":2,"variable":"Total Population","x":55,"y":40,"type":"auxiliary","lengthRect":0},{"id":3,"variable":"Infectivity","x":251,"y":40,"type":"auxiliary","lengthRect":0},{"id":4,"variable":"Infection rate","x":135,"y":370,"type":"flow","lengthRect":0},{"id":5,"variable":"Infected","x":300,"y":290,"type":"stock","lengthRect":69},{"id":6,"variable":"Recovery rate","x":405,"y":360,"type":"flow","lengthRect":0},{"id":7,"variable":"Recovery delay","x":580,"y":375,"type":"auxiliary","lengthRect":0},{"id":8,"variable":"Recovered","x":545,"y":290,"type":"stock","lengthRect":88},{"id":9,"variable":"Contacts per infected","x":300,"y":210,"type":"auxiliary","lengthRect":0},{"id":10,"variable":"Effective contacts per infected","x":252,"y":125,"type":"auxiliary","lengthRect":0},{"id":11,"variable":"Contact rate","x":500,"y":155,"type":"auxiliary","lengthRect":0}],
     edges: [{"source":0,"target":1,"loop":"t","fb":"B1","translate":"left","sourceX":70,"sourceY":275,"targetX":100,"targetY":135,"intermediateX":50},{"source":2,"target":1,"loop":"f","translate":"none","sourceX":100,"sourceY":35,"targetX":110,"targetY":120,"intermediateX":0},{"source":1,"target":4,"loop":"t","fb":"B1","translate":"right","sourceX":135,"sourceY":130,"targetX":155,"targetY":345,"intermediateX":200},{"source":4,"target":0,"loop":"t","fb":"B1","translate":"left","sourceX":130,"sourceY":365,"targetX":75,"targetY":305,"intermediateX":90},{"source":4,"target":5,"loop":"t","fb":"R1","translate":"right","sourceX":233,"sourceY":365,"targetX":325,"targetY":305,"intermediateX":290},{"source":10,"target":4,"loop":"t","fb":"R1","translate":"left","sourceX":260,"sourceY":130,"targetX":195,"targetY":350,"intermediateX":180},{"source":3,"target":10,"loop":"f","translate":"none","sourceX":275,"sourceY":40,"targetX":353,"targetY":115,"intermediateX":0},{"source":9,"target":10,"loop":"t","fb":"R1","translate":"right","sourceX":355,"sourceY":197,"targetX":302,"targetY":133,"intermediateX":350},{"source":5,"target":9,"loop":"t","fb":"R1","translate":"right","sourceX":335,"sourceY":275,"targetX":355,"targetY":225,"intermediateX":355},{"source":5,"target":6,"loop":"t","fb":"B2","translate":"right","sourceX":365,"sourceY":285,"targetX":420,"targetY":340,"intermediateX":410},{"source":6,"target":5,"loop":"t","fb":"B2","translate":"left","sourceX":400,"sourceY":355,"targetX":345,"targetY":305,"intermediateX":350},{"source":7,"target":6,"loop":"f","translate":"none","sourceX":585,"sourceY":370,"targetX":500,"targetY":355,"intermediateX":0},{"source":6,"target":8,"loop":"f","translate":"none","sourceX":475,"sourceY":350,"targetX":543,"targetY":285,"intermediateX":0},{"source":11,"target":9,"loop":"f","translate":"none","sourceX":555,"sourceY":154,"targetX":447,"targetY":206,"intermediateX":0}]
   }

  const colors = d3.scaleOrdinal(d3.schemeCategory10);

  const svg = d3.select(`#${divID}`)
              .append('svg')
              .attr('id', 'svgCLD')
              .attr('height', h)
              .attr('width', w);

  const defs = svg.append("svg:defs").append("svg:marker")
         .attr("id", "arrowhead")
         .attr("refX", 6)
         .attr("refY", 6)
         .attr("markerWidth", 30)
         .attr("markerHeight", 30)
         .attr("orient", "auto")
         .append("path")
         .attr("d", "M 0 0 12 6 0 12 3 6")
         .style("fill", "grey");

  svg.selectAll('.link')
       .data(dataset.edges)
       .enter()
       .append('path')
       .each(function(d, i) {
         if(d.loop === 'f'){
           const x0 = d.sourceX;
           const x1 = d.targetX;
           const deltaX = x1 - x0;
           const y0 = d.sourceY;
           const y1 = d.targetY;
           const deltaY = y1 - y0;
           const lengthX = Math.abs(deltaX);
           const lengthY = Math.abs(deltaY);
           const hypotenuse = Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2));
           const offsetXStart = (r * lengthX) / hypotenuse;
           const offsetYStart = (r * lengthY) / hypotenuse;
           const offsetXEnd = ((r + 6) * lengthX) / hypotenuse;
           const offsetYEnd = ((r + 6) * lengthY) / hypotenuse;
           let xStart, yStart,xEnd, yEnd;
           if(x0 > x1){
             xStart  = x0 - offsetXStart;
             xEnd    = x1 + offsetXEnd;
           } else {
             xStart = x0 + offsetXStart;
             xEnd = x1 - offsetXEnd;
           }
           if(y0 > y1){
             yStart = y0 - offsetYStart;
             yEnd = y1 + offsetYEnd;
           } else {
             yStart = y0 + offsetYStart;
             yEnd = y1 - offsetYEnd;
           }

           const points = [
             {'x': xStart, 'y': yStart},
             {'x': xEnd, 'y': yEnd}
           ]

           const line = d3.line()
                          .x(d => { return d.x; })
                          .y(d => { return d.y;});

           d3.select(this)
             .attr('d', line(points))
             .attr("marker-end", "url(#arrowhead)")
             .attr('stroke-width', 1.5)
             .attr("class", "link");
         } else {
           let offset = 0;
           if(d.translate === 'left'){
             offset = r * -1;
           }
           if(d.translate === 'right'){
             offset = r;
           }
           const xStart = d.sourceX;
           const yStart = d.sourceY;
           const xEnd   = d.targetX;
           const yEnd   = d.targetY;
           const m0 = (yEnd - yStart) / (xEnd - xStart);
           const b0 = -m0 * yEnd + xEnd;

           const line0 = (x, m = m0, b = b0) =>{
             return m * x + b;
           }
           const xMidPoint = (xStart + xEnd) / 2;
           const yMidPoint = (yEnd + yStart) / 2;
           const m1 = -(1 / m0); //m1 is perpendicular to m0
           const b1 = -m1 * xMidPoint + yMidPoint;
           const line1 = (x, m = m1, b = b1) =>{
             return m * x + b;
           }

           const xIntermediate = d.intermediateX;
           const yIntermediate = line1(xIntermediate);

           const points = [
             {'x': xStart, 'y': yStart},
             {'x': xIntermediate, 'y': yIntermediate},
             {'x': xEnd, 'y': yEnd}
           ]

           const line = d3.line()
                          .x(d => { return d.x; })
                          .y(d => { return d.y;})
                          .curve(d3.curveBundle.beta(1));

           d3.select(this)
             .attr('d', line(points))
             .attr("marker-end", "url(#arrowhead)")
             .attr('stroke-width', 1.5)
             .attr("class", "link");
        }
      }); //Closes each

      svg.selectAll('.nodes')
        .data(dataset.nodes)
        .enter()
          .append('g')
          .each(function(d, i) {
            d3.select(this)
                .append('text')
                .text(d => { return d.variable })
                .attr("x", d => { return d.x })
                .attr("y", d => { return d.y })
                .style('fill', '#2171b5');

           const lengthConst = 95 / 11;
           d3.select(this)
                .append('rect')
                .attr('x', d => { return d.x - 5 })
                .attr('y', d => { return d.y - 15})
                .attr('width', d => { return parseInt(d.lengthRect)})
                .attr('height', 20)
                .attr('stroke', d => {
                  if(d.type === 'stock'){
                    return ('black')
                  }
                })
                .attr('fill', 'none');
          })

    const constructRegExp = text => {
      const vectorLoops = text.split(" ");
      const length = vectorLoops.length;
      let stringRegExp = "";
      if (length === 1){
        stringRegExp = vectorLoops[0];
      }
      if (length > 1){
        for(let i = 0; i < length; i++){
          if(i < length - 1){
            stringRegExp += `${vectorLoops[i]}|`;
          } else {
            stringRegExp += `${vectorLoops[i]}`
          }
        }
      }
      return(stringRegExp)
    }
}

export const highlightDominantLoop = (dataset, stock) => {
  const loops = {
    '1': 'B1',
    '2': 'B2',
    '3': 'R1',
    '4': 'B1 B2'
  }
  const variable = `dl_${stock}`;
  const dominantLoop = String(dataset[variable]);
  const dlName = loops[dominantLoop];
  const stringRegExp = ut.constructRegExp(dlName);
  const patt = RegExp(stringRegExp);
  d3.selectAll(".link")
    .attr("class", d => {
      const loops = d.fb;
      const res = patt.test(loops);
      let className;
      if(res === true){
        className = "link dominantLoop";
      } else {
        className = "link";
      }
      return(className);
    });
  // const variables = Object.keys(dataset);
  // const impacts = variables.filter(elem => {
  //   const patt = RegExp(`^imp`);
  //   const res = patt.test(elem);
  //   return(res);
  // });
  //
  // const impOntheStock = impacts.filter(elem => {
  //   const patt = RegExp(`${stock}$`);
  //   const res = patt.test(elem);
  //   return (res);
  // });
  //
  // const balancingImp = impOntheStock.filter(elem => {
  //   const patt = /imp(\w)\d+\w+/;
  //   const result = elem.match(patt)
  //   return(result[1] === 'B');
  // })
  //
  // const reinforcingImp = impOntheStock.filter(elem => {
  //   const patt = /imp(\w)\d+\w+/;
  //   const result = elem.match(patt)
  //   return(result[1] === 'R');
  // })
  //
  //
  // console.log(`impacts: ${balancingImp}`);
}
