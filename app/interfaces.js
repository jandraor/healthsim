const Slider = require("bootstrap-slider");
import * as d3 from 'd3';
const w = 800 * (2 / 3); //Width
const h = 500 * (2 / 3); //Heigth
const padding = 40;

export const buildSliders = () =>{
  const InfectedSlider = new Slider("#slInfected");
  InfectedSlider.on("slide", sliderValue => {
    document.getElementById("lInfected").textContent = sliderValue;
  });

  const ContactRateSlider = new Slider("#slContactRate");
  ContactRateSlider.on("slide", sliderValue => {
    document.getElementById("lContactRate").textContent = sliderValue;
  });

  const InfectivitySlider = new Slider("#slInfectivity");
  InfectivitySlider.on("slide", sliderValue => {
    document.getElementById("lInfectivity").textContent = sliderValue;
  });

  const RecoveryDelaySlider = new Slider("#slRecoveryDelay");
  RecoveryDelaySlider.on("slide", sliderValue => {
    document.getElementById("lRecoveryDelay").textContent = sliderValue;
  });
}

export const drawTimeSeries = () => {


  // const xScale = d3.scaleLinear()
  //                  .domain([0,
  //                    d3.max(dataset, d => { return d.time; })])
  //                .range([0 + padding, w - padding]);

  const xScale = d3.scaleLinear()
                   .domain([0, 50]) // Must change to 100
                   .range([0 + padding, w - padding]);


  const yScale = d3.scaleLinear()
                   .domain([0, 100])
                   .range([h - padding, 0 + padding]);

  //Define X axis
  const xAxis = d3.axisBottom()
                  .scale(xScale);

  //Define Y axis
  const yAxis = d3.axisLeft()
                  .scale(yScale);

  //Create SVG element
  const svg = d3.select("#mainTS")
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

  //Create X axis
  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);

  //Create y axis
  svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(" + padding + ", 0)")
    .call(yAxis);
}

export const runButton = (model_id, fetchJSON)  => {
  d3.select("#run")
    .on("click", async() => {
      const svg = d3.select("#mainTS")
                    .select("svg");
      svg.selectAll(".line").remove();
      const I = document.getElementById("lInfected").textContent;
      const cr = document.getElementById("lContactRate").textContent;
      const i = document.getElementById("lInfectivity").textContent;
      const rd = document.getElementById("lRecoveryDelay").textContent;
      const params = `?I=${I}&cr=${cr}&i=${i}&rd=${rd}`;
      const url = `api/simulate/${model_id}/${params}`;
      const dataset = await fetchJSON(url);

      const rowConverter = d => {
          return {
            time: parseFloat(d.time),
            sSusceptible: parseFloat(d.sSusceptible)
          }
      }

      const arrayLength = dataset.length;

      for (let i = 0; i < arrayLength; i++) {
        dataset[i] = rowConverter(dataset[i]);
      }

      console.log(dataset);

      const xScale = d3.scaleLinear()
                       .domain([0,
                         d3.max(dataset, d => { return d.time;})])
                       .range([0 + padding, w - padding]);

      const yScale = d3.scaleLinear()
                       .domain([0,
                         d3.max(dataset, d => { return d.sSusceptible;})])
                       .range([h - padding, 0 + padding]);



      //Define X axis
      const xAxis = d3.axisBottom()
                      .scale(xScale);

      //Define Y axis
      const yAxis = d3.axisLeft()
                      .scale(yScale);
      //Update X axis
      svg.select(".x-axis")
        .transition()
        .duration(1000)
        .call(xAxis);

      //Update y axis
      svg.select(".y-axis")
        .transition()
        .duration(1000)
        .call(yAxis);

      const line = d3.line()
                     .x(d => { return xScale(d.time); })
                     .y(d => { return yScale(d.sSusceptible);});

      svg.append("path")
        .datum(dataset)
        .attr("class", "line")
        .attr("d", line);
  });
}
