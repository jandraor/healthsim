const $ = require('jquery');
import * as slds from "../../components/sliders.ts"
import * as d3 from 'd3';
import * as saf from "../../components/stocksandflows.ts";

export const buildSliders = () => {

  const callbackInfected = () => {
    const population = parseFloat($('#varValueTotalPop').text());
    const nSusceptible = 100;
    const nInfected = parseInt($('#lInfected').text());
    const nRecovered = 0;
    d3.selectAll(`.crcSusceptible`).remove();
    d3.selectAll(`.crcInfected`).remove();
    d3.selectAll(`.crcRecovered`).remove();
    d3.selectAll('.lblStc').remove();
    saf.fillStock('svgSAF', 'Susceptible', population - nInfected)
    saf.fillStock('svgSAF', 'Infected', nInfected)
    saf.fillStock('svgSAF', 'Recovered', nRecovered)
  }

  const sliderObject = [
    {
      'sliderId': 'slInfected',
      'labelId': 'lInfected',
      'callback': callbackInfected
    },
    {
      'sliderId': 'slContactRate',
      'labelId': 'lContactRate'
    },
    {
      'sliderId': 'slInfectivity',
      'labelId': 'lInfectivity'
    },
    {
      'sliderId': 'slRecoveryDelay',
      'labelId': 'lRecoveryDelay'
    },
  ]

  slds.build(sliderObject);

}
