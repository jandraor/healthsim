import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <ul class = "nav nav-tabs" id = "myTab" role = "tablist">
    <li class = "nav-item">
      <a class ="nav-link active" id = "home-tab" data-toggle = "tab"
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
      <a class ="nav-link" id = "feedbackLoops-tab" data-toggle = "tab"
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
    <div class = "tab-pane fade show active" id = "pHome" role = "tabpanel" arial-labelledby = "home-tab">
    </div>
    <div class = "tab-pane fade" id = "pDescription" role = "tabpanel" arial-labelledby = "description-tab"></div>
    <div class = "tab-pane fade" id = "pEquations" role = "tabpanel" arial-labelledby = "equations-tab"></div>
    <div class = "tab-pane fade" id = "pStocksAndFlows" role = "tabpanel" arial-labelledby = "description-tab"></div>
    <div class = "tab-pane fade" id = "pFeedbackLoops" role = "tabpanel" arial-labelledby = "description-tab">
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
