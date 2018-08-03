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
    <!-- Display -->
    <div class = "row mb-3 border">
      <div id = "mainTS" class = "col-4"></div>
      <div id = "auxTS" class = "col-2">
        <div id = "divSL" class = "mt-5"></div>
      </div>
      <!-- Why -->
      <div id = "why" class = "col-6 text-center border"></div>
    </div>
    <div class = "row ">
      <div id = "controls" class = "col-12 text-muted">
        <h5 class = "my-1 text-muted"> Your decisions:</h5>
        <hr class = "my-1 border-info" />
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
      <a class ="nav-link disabled" id = "description-tab" data-toggle = "tab"
        href = "#pDescription" role = "tab" aria-controls = "description"  aria-selected = "false">
        Description
      </a>
    </li>
    <li class = "nav-item">
      <a class ="nav-link" id = "stocksAndFlows-tab" data-toggle = "tab"
        href = "#pStocksAndFlows" role = "tab" aria-controls = "stocksAndFlows"  aria-selected = "false">
        Stocks & Flows
      </a>
    </li>
    <li class = "nav-item">
      <a class ="nav-link disabled" id = "feedbackLoops-tab" data-toggle = "tab"
        href = "#pFeedbackLoops" role = "tab" aria-controls = "feedbackLoops"  aria-selected = "false">
        Feeback Loops
      </a>
    </li>
    <li class = "nav-item">
      <a class ="nav-link disabled" id = "equations-tab" data-toggle = "tab"
        href = "#pEquations" role = "tab" aria-controls = "equations"  aria-selected = "false">
        Equations
      </a>
    </li>
    <li class = "nav-item">
      <a class ="nav-link active" id = "caseStudies-tab" data-toggle = "tab"
        href = "#pCaseStudies" role = "tab" aria-controls = "caseStudies"  aria-selected = "false">
        Case Study
      </a>
    </li>
  </ul>
  <div class = "tab-content" id = "myTabContent">
    <div class = "tab-pane fade " id = "pHome" role = "tabpanel" arial-labelledby = "home-tab">
    </div>
    <div class = "tab-pane fade" id = "pDescription" role = "tabpanel" arial-labelledby = "description-tab">
    </div>
    <div class = "tab-pane fade" id = "pStocksAndFlows" role = "tabpanel" arial-labelledby = "description-tab">
    </div>
    <div class = "tab-pane fade" id = "pFeedbackLoops" role = "tabpanel" arial-labelledby = "description-tab">
    </div>
    <div class = "tab-pane fade show active" id = "pCaseStudies" role = "tabpanel" arial-labelledby = "description-tab">
    </div>
  </div>
`);
