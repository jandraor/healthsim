import * as Handlebars from '../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
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
