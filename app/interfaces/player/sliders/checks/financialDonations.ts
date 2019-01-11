const $ = require('jquery');

/**
 * Returns a function that prevents the sum of sliders from a class to go beyond a maximum value.
 * @param {Object} params - Function's parameters.
 * @param {string} params.sliderId - Id of slider which upon the function will be applied.
 * @param {string} params.labelMaxValue - Id of label which indicates the max value of the sum of all sliders.
 * @param {string} params.labelClass - Class of labels that contain the values of the elements to be added up.
 * @param {string} params.lUnallocatedClass - Class of labels that indicate the quantity of resources that have not been allocated.
 * @param {string} params.lSum - Id of the label that indicates the quantity of the sum of all sliders.
 * @param {string} params.lStock - Id of the label that indicates the quantity of the resource in stock.
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

    if(difference > 0) {
      const newValue = parseInt($(`#${params.sliderId}`).slider('getValue')) - difference
      $(`#${params.sliderId}`).slider('setValue', newValue, true, true);
      return;
    }
    $(`.${params.lUnallocatedClass}`).each(function(){
      const label = $(this);
      label.text(maxValue - desiredValue);
    })
    $(`#${params.lSum}`).text(desiredValue);

    //Updating max values of order sliders
    const stock = parseInt($(`#${params.lStock}`).text());
    const donations = desiredValue;
    const availableForOrders = stock - donations;
    // deployMax = stock - desiredValue;
    $(`.slOrd`).each(function() {
      const sliderElem = $(this);
      const sliderValue = sliderElem.data('slider').getValue();
      const resource = this.id.replace('slOrd', "");
      const unitCost = parseInt($(`#lUnitCost${resource}`).text());
      const maxOrder = Math.trunc(availableForOrders / unitCost);
      sliderElem.slider('setAttribute', 'max', maxOrder);
      sliderElem.slider('setValue', sliderValue );
      $(`#l${this.id}Max`).text(maxOrder);
    });
  }
  return callback
}
