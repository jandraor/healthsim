import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <ul class = "nav nav-tabs" role = "tablist">
     <li class = "nav-item">
      <a class = "nav-link active" data-toggle = "tab" href = "#divScr">Score</a>
    </li>
    <li class = "nav-item">
      <a class = "nav-link" data-toggle = "tab" href = "#divEpi">Epidemics</a>
    </li>
    <li class = "nav-item">
      <a class = "nav-link" data-toggle = "tab" href = "#divInv">Inventories</a>
    </li>
    <li class = "nav-item">
      <a class = "nav-link" data-toggle = "tab" href = "#divDon">Donations</a>
    </li>
  </ul>
  <div class = "tab-content">
    <div class = "tab-pane fade show active" id = "divScr" role = "tabpanel"></div>
    <div class = "tab-pane fade" id = "divEpi" role = "tabpanel"></div>
    <div class = "tab-pane fade" id = "divInv" role = "tabpanel"></div>
    <div class = "tab-pane fade" id = "divDon" role = "tabpanel"></div>
  </div>
`);
