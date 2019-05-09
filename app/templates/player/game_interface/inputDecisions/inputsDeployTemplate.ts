import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "mx-0">
    <p class = "my-1 text-secondary">{{params.resource}}:
      <label id = "lStock{{params.prefix}}">{{params.availableResources}}</label>
      [units]
    </p>
    <p class = "my-1">To deploy:
      <label id = "lDep{{params.prefix}}">0</label>
    </p>
    <span class = "mx-2 text-secondary slLimit">0</span>
    <input id = "slDep{{params.prefix}}" data-slider-id='deploy-{{params.resource}}-slider'
      type = "text" data-slider-min = "0" data-slider-max = "{{params.availableResources}}"
      data-slider-step = "1" data-slider-value = "0" />
    <span class = "mx-2 text-secondary slLimit"
      id = "lslDep{{params.prefix}}Max">{{params.availableResources}}</span>
    <p class = "py-3">
      To donate: <span id = "l{{params.prefix}}TotalDon">0</span>
      <button class ="btn btn-outline-secondary btn-sm ml-2"
        data-toggle="modal" data-target="#mdl{{params.prefix}}Don">...</button>
    </p>
  </div>
`);
