import * as Handlebars from '../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <h5>Game configuration</h5>
  <div id = "row1">
    <div class = "d-inline-block">
    <p class = "my-1 text-secondary">Rounds:
      <label class = "text-body" id = "lRounds">10</label>
    </p>
    <span class = "mx-2 text-secondary">5</span>
    <input id = "slRounds" data-slider-id = 'rounds-slider'
      type = "text" data-slider-min = "5" data-slider-max = "20"
      data-slider-step = "1" data-slider-value = "10" />
      <span class = "mx-2 text-secondary">20</span>
    </div>
    <div class = "d-inline-block ml-5">
      <p class = "my-1 text-secondary">Virus severity [%]:
        <label class = "text-body" id = "lVirusSeverity">1</label>
      </p>
      <span class = "mx-2 text-secondary">0</span>
      <input id = "slVirusSeverity" data-slider-id = 'virusSeverity-slider'
        type = "text" data-slider-min = "0" data-slider-max = "100"
        data-slider-step = "1" data-slider-value = "1" />
        <span class = "mx-2 text-secondary">100</span>
      </div>
  </div>
  <div class = "my-5" id = "row2">
    <p class = "my-2">Delayed information:</p>
    <div class = "form-row">
      <div class = "col-1">
        <select class = "custom-select" id = "selDelayInfo">
          <option value = "0">No</option>
          <option value = "1">Yes</option>
        </select>
      </div>
    </div>
  </div>
`)
