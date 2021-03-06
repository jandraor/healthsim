import * as Handlebars from '../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div id = 'divInsSetup' class = "mt-3">
    <div class = "d-flex justify-content-center my-3">
      <button type ="button" id = "bStartGame"
        class="btn btn-primary">
        Start game
      </button>
    </div>
    <div class = "my-2" id = "divConfigInputs"></div>
    <h5 class = "text-center">Teams</h5>
    <div class = "d-flex justify-content-center my-3">
      <button type ="button" id = "bEqualSpec"
        class = "btn btn-outline-primary btn-sm mx-1">
        Equal specs
      </button>
      <button type ="button" id = "bRandomSpec"
        class = "btn btn-outline-primary btn-sm mx-1">
        Random specs
      </button>
    </div>
    <div class = "row d-flex justify-content-center" id = "rowTeamCard"></div>
  </div>
`);
