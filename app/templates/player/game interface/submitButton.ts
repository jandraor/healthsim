import * as Handlebars from '../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div id = "divSubmitButton" class = "d-block my-3">
    <button type="button" class="btn btn-primary btn-sm mt-2" id = "bSbmtDcsns">
      Submit decisions
    </button>
    <span class = "invisible" id = "lblInvFinRes">100</span>
  </div>
`);
