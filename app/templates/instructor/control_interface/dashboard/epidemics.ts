import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "mt-2 ml-2" id = "divSelEpi">
    <select class = "selectpicker show-tick" id = "selEpiVar" data-width = "fit">
      <option value = "TotalInfected">Total Infected</option>
      <option value = "InfectedPerCapita"> Infected Per Capita</option>
    </select>
  </div>
  <ul class = "nav nav-pills mb-3 mt-4 pastelblue" id = "pills-tab" role = "tablist">
    <li class = "nav-item">
      <a class = "nav-link active" id = "pills-heatmap-tab" data-toggle="pill" href="#pills-heatmap" role="tab" aria-controls="pills-home" aria-selected="true">Heatmap</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" id = "pills-epiCurves-tab" data-toggle="pill" href="#pills-epiCurves" role="tab" aria-controls="pills-profile" aria-selected="false">Epi curves</a>
    </li>
  </ul>
  <div class="tab-content" id = "pills-tabContent">
    <div class="tab-pane fade show active" id = "pills-heatmap" role="tabpanel" aria-labelledby="pills-home-tab">
      <div class = "mt-5 ml-5" id = "divHeatMap"></div>
    </div>
    <div class = "tab-pane fade" id = "pills-epiCurves" role = "tabpanel" aria-labelledby = "pills-profile-tab">
      <div class = "container-fluid">
        <div class = "row">
          <div class = "col-9">
            <div class = "mt-3" id = "divEpiCurves">
              <div class = "mt-3" id = "divSVGEpiCurves"> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`);
