const $ = require('jquery');
import * as d3 from 'd3';
import * as tsline from "../../../components/tsLine.ts";

export const onClick = dataset => {
  const w = 800 * (2 / 3); //Width
  const h = 500 * (2 / 3); //Height
  const padding = 40;

  d3.select('#bDraw')
    .on('click', () => {
      const selSF = d3.select('#selVarSF');
      selSF.datum(null);
      d3.selectAll('.mouse-over-effects').remove();
      d3.selectAll('.tsLine').remove();
      d3.selectAll('.caseStudyLine').remove();
      d3.selectAll('.csPoint').remove();
      $('#selVarSF').selectpicker('val', 'sInfected');
      $('#selVarSF').prop('disabled', true);
      $('#selVarSF').selectpicker('refresh');
      $('#slInfected').slider('disable');
      $('#slInfected').slider('setValue', dataset[0].y, false);
      $('#lInfected').text(String(dataset[0].y));
      $('#cbComparative')
        .prop('checked', true)
        .attr("disabled", true);
      $("#varValueTo").text('13');
      $("#varValueTotalPop").text('763');
      const options = {
        'dataset': dataset,
        'svgId': "svgTSSF",
        'padding': padding,
        'w': w,
        'h': h,
        'finishTime': 13,
      }
      tsline.drawLineCaseStudy(options);
    });
}
