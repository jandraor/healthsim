import * as Handlebars from '../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div>
    <p class = "my-1 text-secondary">Ventilators:
      <label id = "lVenAvl">100</label> [units]
    </p>
    <p class = "my-1">To deploy:
      <label id = "lDepVen">100</label>
    </p>
    <span class = "mx-2 text-secondary">0</span>
    <input id = "slDepVen" data-slider-id='deploy-ventilators-slider'
      type = "text" data-slider-min = "0" data-slider-max = "100"
      data-slider-step = "1" data-slider-value = "100" />
      <span class = "mx-2 text-secondary">100</span>
      <p class = "py-3">
        To donate: 0 <button class ="btn btn-outline-secondary btn-sm ml-2" data-toggle="modal" data-target="#mdlVenDon">...</button>
      </p>
  </div>
`);
