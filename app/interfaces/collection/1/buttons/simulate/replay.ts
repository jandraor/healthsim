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
      d3.select('#svgSAF')
        .transition()
          .duration(0)
            .on("start", sfd.update(firstRow, 0))
        .transition()
          .duration(2600) //2000 duration + 500 delay + 100 arbitrary for avoiding transition overlaping
            .on("start", function repeat()  {
                if(datasetDiscrete.length > 1) {
                  const oldS = parseInt(datasetDiscrete[0].sSusceptible);
                  const newS = parseInt(datasetDiscrete[1].sSusceptible);
                  const newI = parseInt(datasetDiscrete[1].sInfected);
                  const oldR = parseInt(datasetDiscrete[0].sRecovered);
                  const newR = parseInt(datasetDiscrete[1].sRecovered);
                  sfd.animate(oldS, newS, newI, oldR, newR, 2000);
                  datasetDiscrete.shift();
                  d3.active(this)
                    .transition()
                      .on("start", repeat);
                }
            });
    });
}
