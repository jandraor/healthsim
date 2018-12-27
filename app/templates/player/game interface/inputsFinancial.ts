import * as Handlebars from '../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div>
    <p class = "my-1 text-secondary">
      Financial resources: $
      <label id = "lFinRes">100</label>
    </p>
    <h5>Orders</h5>
    <div class = "my-3">
      <p class = "my-0">
         Antivirals:
         <label class = "lOrd" id = "lOrdAnt">30</label>
      </p>
      <span class = "mx-2 text-secondary"> 0 </span>
      <input class = "slOrd" id = "slOrdAnt" data-slider-id='antivirals-orders-slider'
        type = "text" data-slider-min = "0" data-slider-max = "100"
        data-slider-step = "1" data-slider-value = "30" />
      <span class = "mx-2 text-secondary"> 100 </span>
    </div>
    <div class = "my-3">
    <p class = "my-0">
       Vaccines: <label class = "lOrd" id = "lOrdVac">50</label>
    </p>
      <span class = "mx-2 text-secondary"> 0 </span>
      <input class = "slOrd" id = "slOrdVac" data-slider-id='vaccines-orders-slider'
        type = "text" data-slider-min = "0" data-slider-max = "100"
        data-slider-step = "1" data-slider-value = "50" />
      <span class = "mx-2 text-secondary"> 100 </span>
    </div>
    <div class = "my-3">
      <p class = "my-0">
        Ventilators: <label class = "lOrd" id = "lOrdVen">20</label>
      </p>
      <span class = "mx-2 text-secondary"> 0 </span>
      <input class = "slOrd" id = "slOrdVen" data-slider-id='ventilators-orders-slider'
        type = "text" data-slider-min = "0" data-slider-max = "100"
        data-slider-step = "1" data-slider-value = "20" />
      <span class = "mx-2 text-secondary"> 100 </span>
      <p class = "py-3">
        To donate: $ 0 <button class ="btn btn-outline-secondary btn-sm ml-2" data-toggle="modal" data-target="#mdlFinDon">...</button>
      </p>
    </div>
  </div>
`);
