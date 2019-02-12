import * as Handlebars from '../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class="progress">
    <div class="progress-bar" id = "pbCountdown" role="progressbar" style="width: 100%;"
      aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">05:00:00
    </div>
  </div>
`);
