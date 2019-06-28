import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div id = "divTeamInfo"> </div>
  <div class = "row py-1">
    <div class = "col-3">
      <div class = "text-secondary" id = "divRounds"></div>
    </div>
    <div class = "col-9">
      <button type = "button" class = "btn btn-outline-primary btn-sm"
       data-toggle = "modal" data-target="#mdlSIR">
       Epidemics
      </button>
    </div>
  </div>

  <div class = "row">
    <div class = "col-3 align-self-center" id = "colKPI"></div>
    <div class = "col-9" id = "colBOT"></div>
  </div>
`);
