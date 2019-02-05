import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div id = "feedbackLoopDiagram" class = "d-flex justify-content-center pt-1 mt-1"> </div>
  <div id = "infoLoopDominance" class = "d-flex justify-content-left">
    <label class = "text-left my-auto">Loop dominance on: </label>
    <select id = "selLoopDominance" class = "ml-2 selectpicker show-tick" data-width="fit">
      <option value="sSusceptible">Susceptible</option>
      <option value="sInfected">Infected</option>
      <option value="sRecovered">Recovered</option>
    </select>
  </div>
`);
