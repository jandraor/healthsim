const $ = require('jquery');
import * as slds from "../components/sliders.ts";

/**
 * Returns a function that prevents the sum of sliders from a class to go beyond a maximum value.
 * @param {string} sliderName - Id of slider which upon the function will be applied.
 * @param {string} labelMaxValue - Id of label which indicates the max value of the sum of all sliders.
 * @param {string} labelClass - Class to which the slider belongs to.
 * @param {string} labelAvlResources - Id of the label that displays the difference between the max value & the sum of all sliders.
 */
const callbackGenerator = (sliderId, labelMaxValue,
  labelClass, labelAvlResources) => {
  const callback = () => {
    //const maxValue = parseInt($('#lblInvFinRes').text());
    const maxValue = parseInt($(`#${labelMaxValue}`).text());
    let values = [];
    //$('.lOrd').each(function () {
    $(`.${labelClass}`).each(function () {
      const value = parseInt($(`#${this.id}`).text());
      values.push(value);
    });
    const desiredValue = values.reduce((a, b) => a + b, 0);
    const difference = desiredValue - maxValue;
    if(difference > 0) {
      const newValue = parseInt($(`#${sliderId}`).slider('getValue')) - difference
        $(`#${sliderId}`).slider('setValue', newValue, true, true);
    } else {
      //$('#lFinRes').text(maxValue - desiredValue);
      $(`#${labelAvlResources}`).text(maxValue - desiredValue);
    }
  }
  return callback
}

export const buildSliders = (teams) => {
  const otherTeams = teams.otherTeams;
  //Sliders in the modal(popup) for donation of antivirals
  const sldAntDon = otherTeams.map(elem => {
    const callback = callbackGenerator(`slAntDon${elem}`, 'lblInvAnt', 'lAntDon', 'lRemainingAnt');
    const sliderObject = {
      'sliderId': `slAntDon${elem}`,
      'labelId': `lAntDon${elem}`,
      'callback': callback,
    }
    return sliderObject;
  });
  slds.build(sldAntDon);
  //Sliders in the modal(popup) for donation of vaccines
  const sldVacDon = otherTeams.map(elem => {
    const callback = callbackGenerator(`slVacDon${elem}`, 'lblInvVac', 'lVacDon', 'lRemainingVac');
    const sliderObject = {
      'sliderId': `slVacDon${elem}`,
      'labelId': `lVacDon${elem}`,
      'callback': callback,
    }
    return sliderObject;
  });
  slds.build(sldVacDon);
  //Sliders in the modal(popup) for donation of ventilators
  const sldVenDon = otherTeams.map(elem => {
    const callback = callbackGenerator(`slVenDon${elem}`, 'lblInvVen', 'lVenDon', 'lRemainingVen');
    const sliderObject = {
      'sliderId': `slVenDon${elem}`,
      'labelId': `lVenDon${elem}`,
      'callback': callback,
    }
    return sliderObject;
  });
  slds.build(sldVenDon);
  //Sliders in the modal(popup) for donation of financial resources
  const sldFinDon = otherTeams.map(elem => {
    const callback = callbackGenerator(`slFinDon${elem}`, 'lblInvFin2', 'lFinDon', 'lFinAvl');
    const sliderObject = {
      'sliderId': `slFinDon${elem}`,
      'labelId': `lFinDon${elem}`,
      'callback': callback,
    }
    return sliderObject;
  });
  slds.build(sldFinDon);

  const sliderObject = [
    {
      'sliderId': 'slDepAnt',
      'labelId': 'lDepAnt',
    },
    {
      'sliderId': 'slDepVac',
      'labelId': 'lDepVac',
    },
    {
      'sliderId': 'slDepVen',
      'labelId': 'lDepVen',
    },
    {
      'sliderId': 'slOrdAnt',
      'labelId': 'lOrdAnt',
      'callback': callbackGenerator('slOrdAnt', 'lblInvFinRes', 'lOrd', 'lFinRes'),
    },
    {
      'sliderId': 'slOrdVac',
      'labelId': 'lOrdVac',
      'callback': callbackGenerator('slOrdVac', 'lblInvFinRes', 'lOrd', 'lFinRes'),
    },
    {
      'sliderId': 'slOrdVen',
      'labelId': 'lOrdVen',
      'callback': callbackGenerator('slOrdVen', 'lblInvFinRes', 'lOrd', 'lFinRes')
    },
  ]
  slds.build(sliderObject);
}
