import * as Handlebars from '../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "d-block mt-2">
    <input type = "checkbox" id = "iptQuarantine">
      <span class = "text-success"> Quarantine </span>
    <input type = "checkbox" name = "closeBorders" value = "closeBorders" class = "ml-5">
    <span class = "text-success"> Close borders </span>
  </div>

`);
