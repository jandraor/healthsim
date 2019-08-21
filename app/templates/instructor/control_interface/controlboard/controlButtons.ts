import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <button type="button" class="btn btn-primary btn-sm mt-2" id = "bSimulate" disabled>
      Simulate
  </button>
  <button type="button" class="btn btn-primary btn-sm mt-2" id = "bNewRound">
      New round
  </button>
  <button type="button" class="btn btn-outline-light btn-sm mt-2" id = "bResults" disabled>
      Results
  </button>
`);
