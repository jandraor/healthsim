import * as Handlebars from '../../../node_modules/handlebars/dist/handlebars.js';

export const buttons = Handlebars.compile(`
  <div class="row my-3 controls">
    <div class = "col-12">
      <button id = "bRun" class = "btn btn-outline-primary mx-1 px-15" type="button"> Run </button>
      <button id = "bStep" class = "btn btn-outline-primary mx-1 px-15" type="button"> Step </button>
      <button id = "bReset" class = "btn btn-outline-primary mx-1 px-15" type="button"> Reset </button>
    </div>
  </div>
`);
