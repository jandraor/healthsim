import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "mx-0">
    <p class = "my-1 text-secondary">Antivirals:
      <label id = "lAntAvl">{{antiviralsAvailable}}</label>
      [units]
    </p>
    <p class = "my-1">To deploy:
      <label id = "lDepAnt">0</label>
    </p>
    <span class = "mx-2 text-secondary">0</span>
    <input class = "iptPlayer" id = "slDepAnt" data-slider-id='deploy-antivirals-slider'
      type = "text" data-slider-min = "0" data-slider-max = "{{antiviralsAvailable}}"
      data-slider-step = "1" data-slider-value = "0" />
    <span class = "mx-2 text-secondary" id = "lslDepAntMax">{{antiviralsAvailable}}</span>
    <p class = "py-3">
      To donate: <span id = "lAntTotalDon">0</span>
      <button class ="btn btn-outline-secondary btn-sm ml-2"
        data-toggle="modal" data-target="#mdlAntDon">...</button>
    </p>
  </div>
`);
