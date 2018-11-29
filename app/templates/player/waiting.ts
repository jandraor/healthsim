import * as Handlebars from '../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "mt-5 pt-5">
    <h3 class = "text-center text-secondary"> Please wait until the instructor starts the game</h5>
    <div class = "d-flex justify-content-center" >
      <i class="fa fa-spinner fa-spin mt-3"></i>
    </div>
  </div>
`);
