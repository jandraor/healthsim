import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-social/bootstrap-social.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

import * as d3 from 'd3';

import 'bootstrap';

import * as templates from './templates.ts';

/**
* Convenience method to fetch and decode JSON.
*/
const fetchJSON = async (url, method = 'GET') => {
try {
  const response = await fetch(url, {method, credentials: 'same-origin'});
  return response.json();
} catch (error) {
  return {error};
}
};

/**
 * Show an alert to the user.
 */
const showAlert = (message, type = 'danger') => {
  const alertsElement = document.body.querySelector('.hs-alerts');
  const html = templates.alert({type, message});
  alertsElement.insertAdjacentHTML('beforeend', html);
};

/**
 * Use Window location hash to show the specified view.
 */
const showView = async() => {
  const mainElement = document.body.querySelector('.hs-main');
  const [view, ...params] = window.location.hash.split('/');

  switch(view) {
    case '#welcome':
      const session = await fetchJSON('/api/session');
      console.log(session);
      mainElement.innerHTML = templates.welcome({session});

      if (session.error) {
        showAlert(session.error);
      }
      break;

    case '#interface':
      const session1 = await fetchJSON('/api/session');
      console.log(session1);

      if(session1.auth){
        mainElement.innerHTML = templates.interfaceLayout();
        const dataset = await fetchJSON('/sim/filecsv/data');
        //Function for converting CSV values from strings to Dates and numbers
        const rowConverter = d => {
          return {
            time: parseFloat(d.time), //Convert from string to float
            sStock: parseFloat(d.sStock) //Convert from string to float
        }
      }

        const arrayLength = dataset.length;

        for (let i = 0; i < arrayLength; i++) {
          dataset[i] = rowConverter(dataset[i]);
        }

        const w = 800; //Width
        const h = 500; //Heigth
        const padding = 40;
        //var stepFlag = false;

        var xScale = d3.scaleLinear()
                       .domain([0,
                         d3.max(dataset, d => { return d.time; })])
                       .range([0 + padding, w - padding]);

        var yScale = d3.scaleLinear()
                       .domain([0,
                         d3.max(dataset, d => { return d.sStock; })])
                       .range([h - padding, 0 + padding]);

        //Define X axis
        var xAxis = d3.axisBottom()
                      .scale(xScale);

        //Define X axis
        var yAxis = d3.axisLeft()
                      .scale(yScale);

        //Create SVG element
        var svg = d3.select(".time-series")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

        //Define clipping clip-path
        svg.append("clipPath")
          .attr("id", "chart-area")
          .append("rect")
          .attr("x", padding)
          .attr("y", padding)
          .attr("width", w - padding)
          .attr("height", h - padding);

        //Create circles
        svg.append("g")
          .attr("id", "circles")
          .attr("clip-path", "url(#chart-area)")
          .selectAll("circle")
          .data(dataset)
          .enter()
          .append("circle")
          .attr("cx", function(d){
            return xScale(d.time)
          })
          .attr("cy", d => {
            return yScale(d.sStock);
          })
          .attr("r", 5);

        //Create X axis
        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + (h - padding) + ")")
          .call(xAxis);

        //Create y axis
        svg.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(" + padding + ", 0)")
          .call(yAxis);

        var UpdateTimeSeries = (dataset) => {

                  for(let i in dataset){
                     dataset[i] = rowConverter(dataset[i]);
                  }
/*
                  console.log("stepFlag:" + stepFlag);

                  if(stepFlag == true){
                    var i;
                    for(i = 1; i < response.length; i++){
                      dataset.push(response[i]);
                    }
                  }else{
                    svg.selectAll("circle").remove();
                    dataset = response;
                    stepFlag = true;
                  }
*/
                  svg.selectAll("circle").remove();

                  //Update scale domains
                  xScale.domain([0, d3.max(dataset, function(d) { return d.time; })]);
                  yScale.domain([0, d3.max(dataset, function(d) { return d.sStock; })]);


                  var circles = svg.selectAll("circle")
                       .data(dataset);

                  circles.enter()
                         .append("circle")
                         .merge(circles)
                         .attr("cx", function(d){
                           return xScale(d.time)
                         })
                         .attr("cy", function(d){
                           return yScale(d.sStock)
                          })
                         .attr("r", 3);

                  circles.exit().remove();



                  //Update X axis
                  svg.select(".x.axis")
                       .transition()
                       .duration(1000)
                       .call(xAxis);

                  //Update y axis
                  svg.select(".y.axis")
                     .transition()
                     .duration(1000)
                     .call(yAxis);
                }

        d3.select("#run")
          .on("click", async() => {
          const gr = d3.select("#slider").node().value;
          console.log("-----------testing sync:--------");
          const url = `sim/model/LimitstoGrowth?gr=${gr}`;
          const data = await fetchJSON(url);
          console.log(data);
          console.log("-----------testing sync:--------");
          console.log(gr);
          UpdateTimeSeries(data);
          //ExecuteRCode(gr, UpdateTimeSeries);
        });

      } else{
        showAlert("Not logged in");
        throw Error(`Not logged in`);
      }
      break;

    default:
      // Unrecognised view.
      throw Error(`Unrecognised view: ${view}`);
    }
  };

// Page setup.
(async () => {
  const session = await fetchJSON('/api/session');
  document.body.innerHTML = templates.main({session});
  window.addEventListener('hashchange', showView);
  showView().catch(err => window.location.hash = '#welcome');
})();
