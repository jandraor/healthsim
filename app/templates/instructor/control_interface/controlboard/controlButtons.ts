import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <button type="button" class="btn btn-primary btn-sm mt-2" id = "bSimulate">
      Simulate
  </button>
  <button type="button" class="btn btn-primary btn-sm mt-2" id = "bNewRound" disabled>
      New round
  </button>
`);
