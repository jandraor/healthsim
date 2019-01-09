import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "mx-0">
    <p class = "my-1">To {{options.name}}:
      <label class = "{{options.labelClass}}" id = "{{options.labelName}}">0
      </label>
    </p>
    <span class = "mx-2 text-secondary">0</span>
    <input class = "{{options.sliderClass}}" id = "{{options.sliderName}}"
      data-slider-id='{{options.name}}-AntDon-slider'
      type = "text" data-slider-min = "0" data-slider-max = "{{options.max}}"
      data-slider-step = "1" data-slider-value = "0" />
    <span class = "mx-2 text-secondary" id = "l{{options.sliderName}}Max">{{options.max}}</span>
  </div>
`);
