import * as tsline from "../../components/tsLine.ts";

export const buildCharts = params => {
  const sections = ['Infected', 'Resources'];

  sections.forEach(section => {
    const options = {
        'xmin': 0,
        'xmax': params.rounds,
        'ymin': 0,
        'ymax': 100,
        'width': 400,
        'height': 250,
        'padding': 30,
        'svgId': `svgTS${section}`,
    }
    tsline.drawChart(options);
  });
}
