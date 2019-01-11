import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "my-2 ml-2">
    <p class = "my-0">{{params.resourceName}}</p>
    <p class = "my-0 ml-1 py-0">
      <span class = "text-secondary">
        Total cost: $
      </span>
      <label class = "text-secondary lTotCost"
        id = "lTotCost{{params.idResource}}">0</label>
    </p>
    <p class = "ml-1 my-0 py-0">
      <span class = "text-secondary">
        Cost per unit: $
      </span>
       <label class = "text-secondary" id = "lUnitCost{{params.idResource}}">{{params.costUnit}}</label>
    </p>
    <p class = "my-0 ml-1 py-0">
      <span class = "text-secondary">Order: </span>
      <label class = "lOrd" id = "lOrd{{params.idResource}}">0</label> units
    </p>
    <span class = "mx-2 text-secondary"> 0 </span>
    <input class = "slOrd" id = "slOrd{{params.idResource}}" data-slider-id='slider-orders-{{params.resourceName}}'
      type = "text" data-slider-min = "0" data-slider-max = "{{params.max}}"
      data-slider-step = "1" data-slider-value = "0" />
    <span class = "mx-2 text-secondary" id = lslOrd{{params.idResource}}Max>{{params.max}}</span>
  </div>
`)
