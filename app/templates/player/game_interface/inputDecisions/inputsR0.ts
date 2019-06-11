import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "d-block mt-2">
    <input type = "checkbox" id = "iptQuarantine">
      <span class = "text-success"> Quarantine </span>
  </div>

`);
