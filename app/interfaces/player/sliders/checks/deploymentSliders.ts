const $ = require('jquery');

/**
 * Returns a function that updates the available resources for donations.
 * @param {Object} params - Function's parameters.
 * @param {string} params.lResourcesToUse - Id of the label that indicates the quantity of resources to be used.
 * @param {string} params.lDonations - Id of the label that indicates the quantity of donations to be given.
 * @param {string} params.lStock - Id of the label that indicates the quantity of the resource in stock.
 * @param {string} params.lAvlDon - Id of the label that indicates the maximum quantity of resources for donations.
 * @param {string} params.lUnallocated - Id of the label that indicates the quantity of resources that have not been allocated.
 * @param {string} params.sliderClass - Class of the sliders to set the quantity of resources to be donated to each other team.
 */
export const validate = params => {

  const callback = () => {
    const currentValue = parseInt($(`#${params.lResourcesToUse}`).text());
    const donations = parseInt($(`#${params.lDonations}`).text())
    const totalAvailable = parseInt($(`#${params.lStock}`).text());
    const remaining = totalAvailable - currentValue;
    $(`#${params.lAvlDon}`).text(remaining);
    $(`#${params.lUnallocated}`).text(remaining - donations);
    $(`.${params.sliderClass}`).each(function () {
      const sliderElem = $(`#${this.id}`);//this.id is id of slider
      const sliderValue = sliderElem.data('slider').getValue();
      sliderElem.slider('setAttribute', 'max', remaining);
      sliderElem.slider('setValue', sliderValue );
      $(`#l${this.id}Max`).text(remaining);
    });
  }
  return callback;
}
