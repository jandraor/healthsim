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

  const callbackParameters = () => {
    const infectivity = parseFloat($('#lInfectivity').text());
    const contactRate = parseFloat($('#lContactRate').text());
    const effectiveContact = infectivity * contactRate;
    $('#varValueEftCtcRte').html(`<small>${effectiveContact}</small>`);
    const population = parseFloat($('#varValueTotalPop').text());
    const beta = effectiveContact / population;
    $('#varValueBeta').html(`<small>${beta}</small>`);
    const recoveryDelay = parseFloat($('#lRecoveryDelay').text());
    const basicReproductionNumber = effectiveContact * recoveryDelay;
    $('#varValueBasRepNum').html(`<small>${basicReproductionNumber}</small>`);
  }

  const sliderObject = [
    {
      'sliderId': 'slInfected',
      'labelId': 'lInfected',
      'callback': callbackInfected
    },
    {
      'sliderId': 'slContactRate',
      'labelId': 'lContactRate',
      'callback': callbackParameters
    },
    {
      'sliderId': 'slInfectivity',
      'labelId': 'lInfectivity',
      'callback': callbackParameters
    },
    {
      'sliderId': 'slRecoveryDelay',
      'labelId': 'lRecoveryDelay',
      'callback': callbackParameters
    },
  ]

  slds.build(sliderObject);
}

export const reset = () => {
  $('.sl').each(function(){
    $(this).slider('enable');
    $(this).slider('refresh');
    $(this).trigger('change');
  });
}
