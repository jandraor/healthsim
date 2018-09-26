import * as Handlebars from '../../../node_modules/handlebars/dist/handlebars.js';
const logo2 = require('../../img/logo2.svg')

export const simulationInterface = Handlebars.compile(`
  <div class = "container-fluid pt-2">
    <div class = "row">
      <div class = "col-6">
        <h3> {{modelName}} </h3>
      </div>
      <div class = "d-flex col-6 justify-content-end">
        <a class = "navbar-brand" href = "#welcome">
          <img src = ${logo2} width = "30" height = "30" alt="">
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

export const complementaryInfo = Handlebars.compile(`
  <ul class = "nav nav-tabs" id = "myTab" role = "tablist">
    <li class = "nav-item">
      <a class ="nav-link" id = "home-tab" data-toggle = "tab"
        href = "#pHome" role = "tab" aria-controls = "home" aria-selected = "true">
        Home
      </a>
    </li>
    <li class = "nav-item">
      <a class ="nav-link" id = "description-tab" data-toggle = "tab"
        href = "#pDescription" role = "tab" aria-controls = "description"  aria-selected = "false">
        Description
      </a>
    </li>
    <li class = "nav-item">
      <a class ="nav-link" id = "equations-tab" data-toggle = "tab"
        href = "#pEquations" role = "tab" aria-controls = "equations"  aria-selected = "false">
        Equations
      </a>
    </li>
    <li class = "nav-item">
      <a class ="nav-link" id = "stocksAndFlows-tab" data-toggle = "tab"
        href = "#pStocksAndFlows" role = "tab" aria-controls = "stocksAndFlows"  aria-selected = "false">
        Stocks & Flows
      </a>
    </li>
    <li class = "nav-item">
      <a class ="nav-link active" id = "feedbackLoops-tab" data-toggle = "tab"
        href = "#pFeedbackLoops" role = "tab" aria-controls = "feedbackLoops"  aria-selected = "false">
        Feedback Loops
      </a>
    </li>
    <li class = "nav-item">
      <a class ="nav-link" id = "caseStudies-tab" data-toggle = "tab"
        href = "#pCaseStudies" role = "tab" aria-controls = "caseStudies"  aria-selected = "false">
        Case Study
      </a>
    </li>
  </ul>
  <div class = "tab-content" id = "myTabContent">
    <div class = "tab-pane fade " id = "pHome" role = "tabpanel" arial-labelledby = "home-tab">
    </div>
    <div class = "tab-pane fade" id = "pDescription" role = "tabpanel" arial-labelledby = "description-tab"></div>
    <div class = "tab-pane fade" id = "pEquations" role = "tabpanel" arial-labelledby = "equations-tab"></div>
    <div class = "tab-pane fade" id = "pStocksAndFlows" role = "tabpanel" arial-labelledby = "description-tab">
      <div id = "stockFlowDiagram" class = "d-flex justify-content-center pt-5 mt-5"> </div>
    </div>
    <div class = "tab-pane fade  show active" id = "pFeedbackLoops" role = "tabpanel" arial-labelledby = "description-tab">
      <div id = "feedbackLoopDiagram" class = "d-flex justify-content-center pt-1 mt-1"> </div>
      <div id = "infoLoopDominance" class = "d-flex justify-content-left">
        <label class = "text-left my-auto">Loop dominance on: </label>
        <select id = "selLoopDominance" class = "ml-2 selectpicker show-tick" data-width="fit">
          <option value="sSusceptible">Susceptible</option>
          <option value="sInfected">Infected</option>
          <option value="sRecovered">Recovered</option>
        </select>
      </div>
    </div>
    <div class = "tab-pane fade" id = "pCaseStudies" role = "tabpanel" arial-labelledby = "description-tab">
    </div>
  </div>
`);

export const simulationsInfo = Handlebars.compile(`
  <ul class = "nav  nav-tabs" id = "tabSimulations" role = "tablist">
    <li class = "nav-item">
      <a class = "nav-link active" id = "currentSim-tab" data-toggle = "tab"
       href = "#pCurrentSim" role = "tab" aria-controls = "home" aria-selected = "true">
       Current Simulations
      </a>
    </li>
    <li class = "nav-item">
      <a class = "nav-link" id = "savedSim-tab" data-toggle = "tab"
       href = "#pSavedSim" role = "tab" aria-controls = "home" aria-selected = "true">
       Saved Simulations
      </a>
    </li>
  </ul>
  <div class = "tab-content" id = "simTabContent">
    <div class = "tab-pane fade show active" id = "pCurrentSim" role = "tabpanel" aria-labelledby = "currentSim-tab">
      <div id = "divTblCurrentSim" class = "mt-3 d-block divScroll">
        <table id = "tblCurrentSim" class = "border mx-auto">
          <thead>
            <tr>
              <th class = "border px-1">
                Run
              </th>
              <th class = "border px-1">
                Population
              </th>
              <th class = "border px-1">
                Initial infected
              </th>
              <th class = "border px-1">
                Infectivity
              </th>
              <th class = "border px-1">
                Contact rate
              </th>
              <th class = "border px-1">
                Time to recover
              </th>
              <th class = "border px-1">
                Start time
              </th>
              <th class = "border px-1">
                Stop time
              </th>
              <th class = "border px-1">
                Save
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>

      </div>
    </div>
    <div class = "tab-pane fade " id = "pSavedSim" role = "tabpanel" arial-labelledby = "savedSim-tab">
    <div id = "divTblSavedSim" class = "mt-3 d-block divScroll">
      <table id = "tblSavedSim" class = "border mx-auto">
        <thead>
          <tr>
            <th class = "border px-1">
              sim_id
            </th>
            <th class = "border px-1">
              Start time
            </th>
            <th class = "border px-1">
              Stop time
            </th>
            <th class = "border px-1">
              Population
            </th>
            <th class = "border px-1">
              Initial infected
            </th>
            <th class = "border px-1">
              Infectivity
            </th>
            <th class = "border px-1">
              Contact rate
            </th>
            <th class = "border px-1">
              Time to recover
            </th>
            <th class = "border px-1">
              Play
            </th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  </div>
`);
