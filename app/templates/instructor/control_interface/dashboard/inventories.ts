import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "mt-2 ml-2" id = "divSelInv">
    <select class = "selectpicker show-tick" id = "selInvVar" data-width = "fit">
      <option value = "Antivirals">Antivirals</option>
      <option value = "Vaccines">Vaccines</option>
      <option value = "Ventilators">Ventilators</option>
    </select>
  </div>
  <ul class = "nav nav-pills mb-3 mt-4 pastelblue" id = "pills-tab" role = "tablist">
    <li class = "nav-item">
      <a class = "nav-link active" id = "pills-inventories-heatmap-tab" data-toggle="pill" href="#pills-inventories-heatmap" role="tab" aria-controls="pills-home" aria-selected="true">Heatmap</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" id = "pills-inventories-timeseries-tab" data-toggle="pill" href="#pills-inventories-timeseries" role="tab" aria-controls="pills-profile" aria-selected="false">Timeseries</a>
    </li>
  </ul>
  <div class="tab-content" id = "pills-inventories-tabContent">
    <div class="tab-pane fade show active" id = "pills-inventories-heatmap" role="tabpanel" aria-labelledby="pills-inventories-heatmap-tab">
      <div class = "mt-5 ml-5" id = "divInvHeatMap"></div>
    </div>
    <div class = "tab-pane fade" id = "pills-inventories-timeseries" role = "tabpanel" aria-labelledby = "pills-inventories-timeseries-tab">
      <div class = "container-fluid">
        <div class = "row">
          <div class = "col-9">
            <div class = "mt-3" id = "divInvTimeseries">
              <div class = "mt-3" id = "divSVGInvTimeseries"> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`);
