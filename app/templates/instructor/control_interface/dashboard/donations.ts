import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "mt-2 ml-1" id = "divSelRes">
    <select id = "selRelRes" class = "selectpicker show-tick" data-width="fit">
    </select>
  </div>
  <div class = "mt-2 ml-3" id = "divSVGEpi">
    <svg id = "svgChordDon"></svg>
  </div>
`);
