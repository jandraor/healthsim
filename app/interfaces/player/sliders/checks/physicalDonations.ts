const $ = require('jquery');

/**
 * Returns a function that prevents the sum of sliders from a class to go beyond a maximum value.
 * @param {Object} params - Function's parameters.
 * @param {string} params.sliderId - Id of slider which upon the function will be applied.
 * @param {string} params.labelMaxValue - Id of label which indicates the max value of the sum of all sliders.
 * @param {string} params.labelClass - Class of labels that contain the values of the elements to be added up.
 * @param {string} params.lUnallocated - Id of the label that indicates the quantity of resources that have not been allocated.
 * @param {string} params.lSum - Id of the label that indicates the quantity of the sum of all sliders.
 * @param {string} params.lStock - Id of the label that indicates the quantity of the resource in stock.
 * @param {string} params.sldDepId - Id of the slider that sets the value of resources to be used or deployed for the own team.
 * @param {string} params.lResourcesToUse - Id of the label that indicates the quantity of resources to be used.
 */
export const validate = params => {

  const callback = () => {
    const maxValue = parseInt($(`#${params.labelMaxValue}`).text());
    let values = [];
    $(`.${params.labelClass}`).each(function () {
      const value = parseInt($(`#${this.id}`).text());
      values.push(value);
    });
    const desiredValue = values.reduce((a, b) => a + b, 0);
    const difference = desiredValue - maxValue;
    let deployMax;

    if(difference > 0) {
      const newValue = parseInt($(`#${params.sliderId}`).slider('getValue')) - difference
      $(`#${params.sliderId}`).slider('setValue', newValue, true, true);
      $(`#${params.lSum}`).text(maxValue);
      deployMax = parseInt($(`#${params.lResourcesToUse}`).text());
    } else {
      $(`#${params.lUnallocated}`).text(maxValue - desiredValue);
      $(`#${params.lSum}`).text(desiredValue);
      const stock = parseInt($(`#${params.lStock}`).text());
      deployMax = stock - desiredValue;
    }

    const sliderElem = $(`#${params.sldDepId}`);
    const sliderValue = sliderElem.data('slider').getValue();
    sliderElem.slider('setAttribute', 'max', deployMax);
    sliderElem.slider('setValue', sliderValue );
    $(`#l${params.sldDepId}Max`).text(deployMax);
  }
  return callback
}
