const $ = require('jquery');
import * as slds from "../components/sliders.ts";

/**
 * Returns a function that prevents the sum of sliders from a class to go beyond a maximum value.
 * @param {string} sliderId - Id of slider which upon the function will be applied.
 * @param {string} labelMaxValue - Id of label which indicates the max value of the sum of all sliders.
 * @param {string} labelClass - Class to which the slider belongs to.
 * @param {string} lUnallocated - Id of the label that indicates the quantity of resources that have not been allocated.
 * @param {string} lDonations - Id of the label that indicates the quantity of donations to be given.
 * @param {string} lStock - Id of the label that indicates the quantity of the resource in stock.
 * @param {string} sldDepId - Id of the slider that sets the value of resources to be used or deployed for the own team.
 * @param {string} lResourcesToUse - Id of the label that indicates the quantity of resources to be used.
 */
const validateSlidersSum = (sliderId, labelMaxValue,
  labelClass, lUnallocated, lDonations, lStock, sldDepId, lResourcesToUse) => {

  const callback = () => {
    const maxValue = parseInt($(`#${labelMaxValue}`).text());
    let values = [];
    $(`.${labelClass}`).each(function () {
      const value = parseInt($(`#${this.id}`).text());
      values.push(value);
    });
    const desiredValue = values.reduce((a, b) => a + b, 0);
    const difference = desiredValue - maxValue;
    let deployMax;

    if(difference > 0) {
      const newValue = parseInt($(`#${sliderId}`).slider('getValue')) - difference
      $(`#${sliderId}`).slider('setValue', newValue, true, true);
      $(`#${lDonations}`).text(maxValue);
      deployMax = parseInt($(`#${lResourcesToUse}`).text());
    } else {
      $(`#${lUnallocated}`).text(maxValue - desiredValue);
      $(`#${lDonations}`).text(desiredValue);
      const stock = parseInt($(`#${lStock}`).text());
      deployMax = stock - desiredValue;
    }

    const sliderElem = $(`#${sldDepId}`);sldDepId
    const sliderValue = sliderElem.data('slider').getValue();
    sliderElem.slider('setAttribute', 'max', deployMax);
    sliderElem.slider('setValue', sliderValue );
    $(`#l${sldDepId}Max`).text(deployMax);
  }
  return callback
}

/**
 * Returns a function that updates the available resources for donations.
 * @param {string} lResourcesToUse - Id of the label that indicates the quantity of resources to be used.
 * @param {string} lDonations - Id of the label that indicates the quantity of donations to be given.
 * @param {string} lStock - Id of the label that indicates the quantity of the resource in stock.
 * @param {string} lAvlDon - Id of the label that indicates the maximum quantity of resources for donations.
 * @param {string} lUnallocated - Id of the label that indicates the quantity of resources that have not been allocated.
 * @param {string} sliderClass - Class of the sliders to set the quantity of resources to be donated to each other team.
 */
const updateDonationsLimits = (lResourcesToUse, lDonations, lStock, lAvlDon,
  lUnallocated, sliderClass) => {

  const callback = () => {
    const currentValue = parseInt($(`#${lResourcesToUse}`).text());
    const donations = parseInt($(`#${lDonations}`).text())
    const totalAvailable = parseInt($(`#${lStock}`).text());
    const remaining = totalAvailable - currentValue;
    $(`#${lAvlDon}`).text(remaining);
    $(`#${lUnallocated}`).text(remaining - donations);
    $(`.${sliderClass}`).each(function () {
      const sliderElem = $(`#${this.id}`);//this.id is id of slider
      const sliderValue = sliderElem.data('slider').getValue();
      sliderElem.slider('setAttribute', 'max', remaining);
      sliderElem.slider('setValue', sliderValue );
      $(`#l${this.id}Max`).text(remaining);
    });
  }
  return callback;
}

export const buildSliders = (teams) => {
  const otherTeams = teams.otherTeams;
  //Sliders in the modal(popup) for donation of antivirals
  const sldAntDon = otherTeams.map(elem => {
    const callback = validateSlidersSum(`slAntDon${elem}`, 'lblInvAnt',
      'lAntDon', 'lRemainingAnt', 'lAntTotalDon', 'lAntAvl', 'slDepAnt', 'lDepAnt');
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
    const callback = validateSlidersSum(`slVacDon${elem}`, 'lblInvVac',
      'lVacDon', 'lRemainingVac', 'lVacTotalDon', 'lVacAvl', 'slDepVac', 'lDepVac');
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
    const callback = validateSlidersSum(`slVenDon${elem}`, 'lblInvVen',
      'lVenDon', 'lRemainingVen', 'lVenTotalDon', 'lVenAvl', 'slDepVen', 'lDepVen');
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
    const callback = validateSlidersSum(`slFinDon${elem}`, 'lblInvFin2',
      'lFinDon', 'lFinAvl', 'FinTotalDon', 'lFinAvl', 'slDepFin', 'lDepFin');
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
      'callback': updateDonationsLimits('lDepAnt', 'lAntTotalDon', 'lAntAvl',
        'lblInvAnt', 'lRemainingAnt', 'slAntDon'),
    },
    {
      'sliderId': 'slDepVac',
      'labelId': 'lDepVac',
      'callback': updateDonationsLimits('lDepVac', 'lVacTotalDon', 'lVacAvl',
        'lblInvVac', 'lRemainingVac', 'slVacDon'),
    },
    {
      'sliderId': 'slDepVen',
      'labelId': 'lDepVen',
      'callback': updateDonationsLimits('lDepVen', 'lVenTotalDon', 'lVenAvl',
        'lblInvVen', 'lRemainingVen', 'slVenDon'),
    },
    {
      'sliderId': 'slOrdAnt',
      'labelId': 'lOrdAnt',
      'callback': validateSlidersSum('slOrdAnt', 'lblInvFinRes', 'lOrd', 'lFinRes', 'FinTotalDon', 'lFinAvl', 'slDepFin', 'lDepFin'),
    },
    {
      'sliderId': 'slOrdVac',
      'labelId': 'lOrdVac',
      'callback': validateSlidersSum('slOrdVac', 'lblInvFinRes', 'lOrd', 'lFinRes', 'FinTotalDon', 'lFinAvl', 'slDepFin', 'lDepFin'),
    },
    {
      'sliderId': 'slOrdVen',
      'labelId': 'lOrdVen',
      'callback': validateSlidersSum('slOrdVen', 'lblInvFinRes', 'lOrd', 'lFinRes', 'FinTotalDon', 'lFinAvl', 'slDepFin', 'lDepFin')
    },
  ]
  slds.build(sliderObject);
}
