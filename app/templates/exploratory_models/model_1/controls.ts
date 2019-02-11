import * as Handlebars from '../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class="row my-3 controls">
    <div class = "col-12">
      <button id = "bRun" class = "btn btn-outline-primary mx-1 px-15" type="button"> Run </button>
      <button id = "bStep" class = "btn btn-outline-primary mx-1 px-15" type="button"> Step </button>
      <button id = "bReset" class = "btn btn-outline-primary mx-1 px-15" type="button"> Reset </button>
      <label class="checkbox-inline">
        <input class = "cb" id = "cbComparative" type = "checkbox" value = ""> Comparative
      </label>
    </div>
  </div>
`);
