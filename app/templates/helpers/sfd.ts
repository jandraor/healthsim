import * as Handlebars from '../../../node_modules/handlebars/dist/handlebars.js';

export const layout = Handlebars.compile(`
  <div id = "stockFlowDiagram" class = "d-flex justify-content-center pt-5 mt-5">
  </div>
  <div id = "divReplayButton">
    <button id = "bReplay" class = "btn btn-outline-primary mx-1 px-15"
      type = "button"> Instant Replay </button>
  <div/>
  `);
