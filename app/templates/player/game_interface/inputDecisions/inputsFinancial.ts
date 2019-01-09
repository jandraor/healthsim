import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div>
    <p class = "my-1 text-secondary">
      Financial resources: $
      <label id = "lFinRes">{{finResources}}</label>
      <span class = "d-none" id = "lblInvFinRes">{{finResources}}</span>
    </p>
    <h5>Orders</h5>
    <div id = "divOrders"></div>
      <p class = "py-3">
        To donate: $ 0 <button class ="btn btn-outline-secondary btn-sm ml-2" data-toggle="modal" data-target="#mdlFinDon">...</button>
      </p>
    </div>
  </div>
`);
