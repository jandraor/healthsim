import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div id = "divTeamInfo"> </div>
  <div class = "text-secondary" id = "divRounds"></div>
  <div class = "row">
    <div class = "col-3 align-self-center" id = "colKPI"></div>
    <div class = "col-9" id = "colBOT"></div>
  </div>
`);
