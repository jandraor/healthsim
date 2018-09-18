import * as Handlebars from '../../../node_modules/handlebars/dist/handlebars.js';

export const parameters = Handlebars.compile(`
  <!-- First group of parameters-->
  <div id ="firstGroupPar" class = "d-block ml-3">
    <div class = "d-inline-block divPar" id = "divInfected">
      <span class = "d-block my-2">
        <b>Infected [People]:</b>
        <span id="lInfected">{{initial}}</span>
      </span>
      <div>
        <span class = "mx-2">0</span>
        <input id = "slInfected" data-slider-id='Infected-Slider' type="text"
          data-slider-min = "0" data-slider-max = {{totalPop}}
          data-slider-step = {{step}} data-slider-value = {{initial}} />
        <span class = "mx-2">{{totalPop}}</span>
      </div>
    </div>
    <div class = "d-inline-block divPar" id = "divContacts">
      <span class = "d-block my-2">
        <b>Contact rate [People per person per day]:</b>
        <span id = "lContactRate">8</span>
      </span>
      <div class = "form-group">
        <span class = "mx-2">0</span>
        <input id = "slContactRate" data-slider-id='ContactRate-Slider'
          type="text" data-slider-min = "0" data-slider-max = "100"
          data-slider-step="1" data-slider-value="8"/>
        <span class = "mx-2">100</span>
      </div>
    </div>
  </div>

  <!-- Second group of parameters -->
  <div id ="secondGroupPar" class = "d-block ml-3">
    <div class = "d-inline-block divPar" id= "divInfectivity">
      <span class = "d-block my-2">
        <b>Infectivity [%]:</b>
        <span id="lInfectivity">0.25</span>
      </span>
      <div class = "form-group">
        <span class = "mx-2">0</span>
        <input id = "slInfectivity" data-slider-id='Infectivity-Slider' type="text" data-slider-min="0" data-slider-max="1" data-slider-step="0.05" data-slider-value="0.25"/>
        <span class = "mx-2">1</span>
      </div>
    </div>
    <div class = "d-inline-block divPar" id = "divRecoveryDelay">
      <span class = "d-block my-2">
        <b>Time to recover [days]:</b>
        <span id="lRecoveryDelay">2</span>
      </span>
      <div class = "form-group">
        <span class = "mx-2">1</span>
        <input class = "ModelParameter" id = "slRecoveryDelay" data-slider-id ='RecoveryDelay-Slider'
          type = "text" data-slider-min = "1" data-slider-max = "100"
          data-slider-step = "1" data-slider-value = "2"/>
        <span class = "mx-2">100</span>
      </div>
    </div>
  </div>




















  `);
