import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div>
    <h4>Financial decisions</h4>
    <p class = "my-0 py-0 text-secondary">
        Funds: $
        <span class = "float-right text-dark font-weight-bold"
          id = "lFunds">
          {{finResources}}
        </span>
    </p>
    <p class = "my-0 py-0 text-secondary">
      Not allocated: $
      <span class = "float-right text-dark lUnallocatedFin"
        id = "lFinRes">{{finResources}}</span>
    </p>
    <p class = "py-3">
      To donate:
      <button class ="btn btn-outline-secondary btn-sm ml-2" data-toggle="modal" data-target="#mdlFinDon">...</button>
      $
      <span class = "float-right text-dark"
        id = "lFinTotalDon">0</span>
    </p>
    <h5>Orders</h5>
    <p class = "my-0 text-secondary">
      Total spent: $
      <span class = "float-right text-dark" id = "lSpent">0</span>
    </p>
    <div id = "divOrders"></div>
  </div>


`);
