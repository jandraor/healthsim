import * as Handlebars from '../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div id = 'divInsSetup' class = "mt-3">
    <h5>Teams</h5>
    <div class = "row" id = "rowTeamCard"></div>
  </div>
`);
