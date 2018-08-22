import * as Handlebars from '../../../node_modules/handlebars/dist/handlebars.js';
const imgSettings = require('../../img/settings.svg')

export const buttons = Handlebars.compile(`
  <div class="row my-1 controls">
    <div class = "col-12">
      <button id = "bRun" class = "btn btn-outline-primary mx-1 px-15" type="button"> Run </button>
      <button id = "bStep" class = "btn btn-outline-primary mx-1 px-15" type="button"> Step </button>
      <button id = "bReset" class = "btn btn-outline-primary mx-1 px-15" type="button"> Reset </button>
      <button id = "bConfig" class = "btn btn-outline-primary mx-1 px-15" type="button">
        <img src = ${imgSettings} width = "30" height = "24" alt="">
      </button>
      <label class="checkbox-inline">
        <input id = "cbComparative" type = "checkbox" value = ""> Comparative
      </label>
    </div>
  </div>
`);
