import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "container-fluid">
    <div class = "row">
      <div class = "col-5" id = "colChord">
        <div class = "mt-2 ml-1" id = "divSelRes">
          <select id = "selRelRes" class = "selectpicker show-tick" data-width="fit">
          </select>
        </div>
        <p class = "text-center mt-2">Donation flows</p>
        <div class = "mt-2 d-flex justify-content-center" id = "divSVGEpi">
          <svg id = "svgChordDon"></svg>
        </div>
        <div class = "text-secondary text-center">
          Total donations: <span class = "text-dark" id = "lTotalDonations">N/A</span>
        </div>
      </div>
      <div class = "col-4" id = "colBarCharts"></div>
    </div>
  </div>
`);
