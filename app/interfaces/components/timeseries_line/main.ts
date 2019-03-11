import * as chart from './chart.ts';
import * as baseline from './baseline.ts';

export const drawChart = options => {
  chart.draw(options);
}

export const drawLine = options => {
  baseline.draw(options);
}

export const drawLineCaseStudy = options => {

}

export const clearChart = svgId => {
  chart.clear(svgId);
}

export const drawGroupChart = options => {
  chart.drawGroup(options);
}
