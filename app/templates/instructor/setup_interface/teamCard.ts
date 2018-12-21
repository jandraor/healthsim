import * as Handlebars from '../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "col-4 mt-3">
    <div class = "card cardTeam" id = 'card{{teamName}}'>
      <div class = "card-header">
        {{teamName}}
      </div>
      <div class = "card-body">
        <form id = "form-{{teamName}}" class = "needs-validation" novalidate>
          <p class = "text-secondary">Population size: </p>
          <div class="form-group">
            <select class = "custom-select selPopSize" id = 'selPopSize-{{teamName}}' title="Please choose..." required>
              <option disabled selected value>Please choose...</option>
              <option value = "5000">Low</option>
              <option value = "15000">Middle</option>
              <option value = "30000">High</option>
            </select>
            <div class="invalid-feedback">
              Empty field
            </div>
          </div>
          <p class = "text-secondary">Income size:</p>
          <div class="form-group">
            <select class = "custom-select selIncSize" id = 'selIncSize-{{teamName}}' title="Please choose..." required>
              <option disabled selected value>Please choose...</option>
              <option value = "Low">Low</option>
              <option value = "Middle">Middle</option>
              <option value = "High">High</option>
            </select>
            <div class="invalid-feedback">Empty field</div>
          </div>
        </form>

          <p class = "text-secondary"> Is there an individual infected?:
            <input type="checkbox" class = "checkbox-inline" id = "cbInfected-{{teamName}}">
          </p>
          <p class = "text-secondary">Players:</p>
          <ul class = 'playerList' id = 'playerList-{{teamName}}'></ul>

      </div>
    </div>
  </div>
`);
