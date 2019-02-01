import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "mt-2 ml-2" id = "divSelect">
    <select class = "selectpicker" id = "selHeatMap" data-width="fit">
      <option value = "Infected">Total Infected</option>
    </select>
  </div>
  <div class = "mt-5 ml-5" id = "divHeatMap"></div>
`);
