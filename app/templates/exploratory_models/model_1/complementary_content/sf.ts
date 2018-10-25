import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div id = "stockFlowDiagram" class = "d-flex justify-content-center pt-5 mt-5">
  </div>
  <div id = 'divIndSAF'>
    <p class = "ml-4 my-1 mb-3">
      <span class = "text-secondary">Time:</span>
      <span id = "indTime" class = "mr-5">0</span>
    </p>
  </div>
  <div id = "divReplayButton">
    <button id = "bReplay" class = "btn btn-outline-primary mx-1 px-15 mr-4"
      type = "button" disabled> Instant Replay </button>
  <div/>
  <div id = 'verificationSF'class = "border invisible">
    Count susceptible: <span id = "lCntSusceptible"> 9990 </span>
    Count infected: <span id = "lCntInfected"> 10 </span>
    Count recovered: <span id = "lCntRecovered"> 0 </span>

  </div>
`);
