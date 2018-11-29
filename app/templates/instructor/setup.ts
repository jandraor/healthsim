import * as Handlebars from '../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div id = 'divInsSetup' class = "mt-3">
    <div class = "d-flex justify-content-center my-3">
      <button type ="button" id = "bStartGame"
        class="btn btn-outline-success">
        Start game
      </button>
    </div>
    <h5 class = "text-center">Teams</h5>
    <div class = "row d-flex justify-content-center" id = "rowTeamCard"></div>
  </div>
`);
