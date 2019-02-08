import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "container-fluid">
    <div class = "row">
      <div class = "col-1">
        <div class = "mt-2 ml-1" id = "divSelRes">
          <select id = "selRelRes" class = "selectpicker show-tick" data-width="fit">
          </select>
        </div>
      </div>
      <div class = "col-5" id = "colChord">
        <p class = "text-center mt-4">Donation flows</p>
        <div class = "mt-2 d-flex justify-content-center" id = "divSVGFloDon">
          <svg id = "svgChordDon"></svg>
        </div>
        <div class = "text-secondary text-center mt-1">
          Total donations: <span class = "text-dark" id = "lTotalDonations">N/A</span>
        </div>
      </div>
      <div class = "col-5" id = "colBarCharts">
        <p class = "text-center mt-4">Top Donors</p>
        <div class = "mt-2 d-flex justify-content-center" id = "divSVGTopDon">
          <svg id = "svgBarChartTopDon"></svg>
        </div>
      </div>
    </div>
  </div>
`);
