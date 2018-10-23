import * as d3 from 'd3';
import * as sfd from "../../sf.ts";


export const build = ()  => {

  d3.select("#bReplay")
    .on("click", () => {
      const superDataset = d3.select('#selVarSF').datum();
      const dataset = superDataset[superDataset.length - 1];
      const datasetDiscrete = dataset.filter(row => {
        const timeFloat = parseFloat(row.time);
        const timeInteger = parseInt(row.time);
        return(timeFloat - timeInteger === 0);
      });
      //Set initial values of stock & flow
      const firstRow = datasetDiscrete[0];

      const repeat = function repeat() {
        if(datasetDiscrete.length > 1) {
          const oldS = parseInt(datasetDiscrete[0].sSusceptible);
          const newS = parseInt(datasetDiscrete[1].sSusceptible);
          const newI = parseInt(datasetDiscrete[1].sInfected);
          const oldR = parseInt(datasetDiscrete[0].sRecovered);
          const newR = parseInt(datasetDiscrete[1].sRecovered);
          const duration = 2000;
          const delay = 0;
          sfd.animate(oldS, newS, newI, oldR, newR, duration, delay);
          datasetDiscrete.shift();
          d3.active(this)
            .transition()
              .duration(duration + delay + 100) // Allow to finish the transition
              .on('end', repeat)
        }
      }
      d3.select('#svgSAF').transition()
          .duration(0)
          .on("start", function(){
            sfd.update(firstRow, 0);
          })
          .on('end', repeat)
    }); // closes on click event
}
