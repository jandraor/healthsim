import * as Handlebars from '../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div>
    <p class = "my-1 text-secondary">Vaccines: <label>1000</label> [units]</p>
    <p class = "my-1">To deploy:
      <label id = "lDepVac">50</label>
    </p>
    <span class = "mx-2 text-secondary">0</span>
    <input id = "slDepVac" data-slider-id='deploy-vaccines-slider'
      type = "text" data-slider-min = "0" data-slider-max = "100"
      data-slider-step = "1" data-slider-value = "50" />
      <span class = "mx-2 text-secondary">100</span>
      <p class = "py-3">
        To donate: 0 <button class ="btn btn-outline-secondary btn-sm ml-2" data-toggle="modal" data-target="#mdlVacDon">...</button>
      </p>
  </div>
`);
