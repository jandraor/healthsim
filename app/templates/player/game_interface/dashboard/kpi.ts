import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "my-5" id = "divEconomy">
    <h6 class = "mt-2 text-center text-secondary">Economy</h6>
    <div class = "d-flex justify-content-center mt-2" id = "divSVGEconPerf">
      <svg id = "svgEconPerf"></svg>
    </div>
  </div>
  <div class = "my-5" id = "divEpidemics">
    <h6 class = "mt-2 text-center text-secondary">Epidemics</h6>
    <div class = "d-flex justify-content-center" id = "divSVGInf">
      <svg id = "svgInfectedPct"></svg>
    </div>
    <p class = "subtitle my-0 py-0 text-center">Infected</p>
  </div>
  <div class = "mt-4" id = "divCoverages">
    <h6 class = "mt-2 text-center text-secondary">Resource coverage</h6>
    <div class = "d-flex justify-content-center mt-4">
      <div class = "d-inline-block" id = "divVacCov">
        <div class = "d-flex justify-content-center" id = "divSVGVacCov">
          <svg id = "svgVacCov"></svg>
        </div>
        <p class = "subtitle my-0 py-0 text-center">Vaccines</p>
      </div>
      <div class = "d-inline-block" id = "divAntCov">
        <div class = "d-flex justify-content-center" id = "divSVGAntCov">
          <svg id = "svgAntCov"></svg>
        </div>
        <p class = "subtitle my-0 py-0 text-center">Antivirals</p>
      </div>
      <div class = "d-inline-block" id = "divVenCov">
        <div class = "d-flex justify-content-center" id = "divSVGVenCov">
          <svg id = "svgVenCov"></svg>
        </div>
        <p class = "subtitle my-0 py-0 text-center">Ventilators</p>
      </div>
    </div>
  </div>
`);
