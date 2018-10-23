import * as Handlebars from '../../../../node_modules/handlebars/dist/handlebars.js';
const logo2 = require('../../../img/logo2.svg')

export const html = Handlebars.compile(`
  <div class = "container-fluid pt-2">
    <div class = "row">
      <div class = "col-6">
        <h3 class = "text-muted"> {{modelName}} </h3>
      </div>
      <div class = "d-flex col-6 justify-content-end">
        <a class = "navbar-brand" href = "#explore/r">
          <!--<img src = ${logo2} width = "30" height = "30" alt="">-->
          HealthSim
        </a>
      </div>
    </div>
  </div>
  <div class="row hs-alerts"></div>
  <div class="container-fluid hs-interface">
    <!-- Display row -->
    <div class = "row mb-3 ml-0 border">
      <div align = 'center' id = "mainTS" class = "col-lg-4 col-md-6 col-sm-12">
        <div id = "divTSSF">
          <select id = "selVarSF" class = "pt-2 selectpicker show-tick" data-width="fit">
          </select>
        </div>
        <div id = 'divParTS'>
          <span class = "text-center">Net reproduction number</span>
        </div>
      </div>
      <div id = "auxTS" class = "col-lg-2 col-sm-12">
        <div id = "divSL" class = "mt-5">
          <table id = "tblSparklines">
            <thead>
              <tr class = "border-bottom">
                <th>
                  <small>Key metrics</small>
                </th>
                <th>
                  <small>Behaviour over time</small>
                </th>
                <th>
                  <small>Current</small>
                </th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
        <div class = "mt-5 py-2 border border-light">
          <p class = "ml-4 my-1">
            <span>Current time:</span> <span id = "varValueCurTim">0</span>
          </p>
          <p class = "ml-4 my-1">
            <span class = "text-secondary"><small>Population:</small></span>
            <span id = "varValueTotalPop"><small>1000</small></span>
          </p>
          <p class = "ml-4 my-1">
            <span class = "text-secondary"><small>Basic reproduction number:</small></span>
            <span id = "varValueBasRepNum"><small>4</small></span>
          </p>
          <p class = "ml-4 my-1">
            <span class = "text-secondary"><small>&beta;:</small></span>
            <span id = "varValueBeta"><small>0.002</small></span>
          </p>
          <p class = "ml-4 my-1">
            <span class = "text-secondary"><small>Effective contact rate:</small></span>
            <span id = "varValueEftCtcRte"><small>2</small></span>
          </p>
        </div>
      </div>
      <!-- Why -->
      <div id = "why" class = "col-lg-6 col-sm-12 text-center border"></div>
    </div>
    <!-- Last row -->
    <div class = "row border ml-0">
      <div class = "border col-lg-6 col-sm-12">
        <div id = "divControls" class = "col-12 text-muted">
          <h5 class = "d-inline my-1 text-muted"> Your decisions</h5>
          <span>From:</span> <span id = "varValueFrom">0</span>
          <span>To:</span> <span id = "varValueTo">20</span>
          <hr class = "my-1 border-info" />
        </div>
        <div id = "divSliders"></div>
      </div>
      <div class = "col-lg-6 col-sm-12 border">
        <div id = "divSimulations"></div>
      </div>
    </div>
  </div>
`);
