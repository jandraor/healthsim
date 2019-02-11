import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <span class = "d-block my-2">
    <b>{{params.label}}</b>
    <span id="l{{params.id}}">{{params.init}}</span>
  </span>
  <div>
    <span class = "mx-2">{{params.min}}</span>
    <input class = "sl" id = "sl{{params.id}}" data-slider-id = '{{params.id}}-Slider' type="text"
      data-slider-min = "{{params.min}}" data-slider-max = {{params.max}}
      data-slider-step = {{params.step}} data-slider-value = {{params.init}} />
    <span class = "mx-2">{{params.max}}</span>
  </div>
`);
