const $ = require('jquery');

/**
 * Returns a function that verifies that the desired order is affordable.
 * @param {Object} params - Function's parameters.
 * @param {string} params.sliderId - Id of slider which upon the function will be applied.
 * @param {string} params.lUnitCostId - Id of the label that displays of the resource's unit cost.
 * @param {string} params.lTotalCost - Id of the label that displays of the total cost of the order.
  * @param {string} params.lUnallocatedClass - Class of labels that indicate the quantity of resources that have not been allocated.
 * @param {string} params.lSum - Id of the label that indicates the quantity of donations to be given.
 * @param {string} params.lStock - Id of the label that indicates the quantity of the resource in stock.
 * @param {string} params.lAvlDon - Id of the label that indicates the maximum quantity of resources available for donations. It is in the financial donations modal.
 * @param {string} params.lDonations - Id of the label that indicates the quantity of donations to be given.
 * @param {string} params.orderSliders - Class of the sliders that set the quantity of resources to be ordered.
 * @param {string} params.donationSliders - Class of the sliders to set the quantity of resources to be donated to each other team.
 */

export const validate = params => {
  const callback = () => {
    const stock = parseInt($(`#${params.lStock}`).text());
    const donations = parseInt($(`#${params.lDonations}`).text());
    const availableFundsForOrders = stock - donations;
    const unitCost = parseInt($(`#${params.lUnitCostId}`).text());

    let values = [];
    $(`.${params.orderSliders}`).each(function () {
      const sliderElem = $(this);
      const resource = this.id.replace(params.orderSliders, "");
      const unitCost = parseInt($(`#lUnitCost${resource}`).text());
      const value = sliderElem.data('slider').getValue() * unitCost;
      values.push(value);
    });

    const desiredValue = values.reduce((a, b) => a + b, 0);
    const difference = desiredValue - availableFundsForOrders;

    if(difference > 0) {
      const sliderValue = $(`#${params.sliderId}`).slider('getValue');
      const otherOrders = desiredValue - (sliderValue * unitCost);
      const maxOrderValue = availableFundsForOrders - otherOrders
      const maxOrderQuantity =  Math.trunc(maxOrderValue / unitCost);
      $(`#${params.sliderId}`).slider('setValue', maxOrderQuantity, true, true);
      return;
    }

    const order = $(`#${params.sliderId}`).slider('getValue');
    const totalCost = order * unitCost;
    $(`#${params.lTotalCost}`).text(totalCost);
    const unallocated = availableFundsForOrders - desiredValue;
    const availableForDonations = stock - desiredValue;
    $(`.${params.lUnallocatedClass}`).each(function(){
      const label = $(this);
      label.text(unallocated);
    })
    $(`#${params.lSum}`).text(desiredValue);
    $(`#${params.lAvlDon}`).text(availableForDonations);

    $(`.${params.donationSliders}`).each(function () {
      const sliderElem = $(this);
      const sliderValue = sliderElem.data('slider').getValue();
      sliderElem.slider('setAttribute', 'max', availableForDonations);
      sliderElem.slider('setValue', sliderValue );
      $(`#l${this.id}Max`).text(availableForDonations);
    });
  }
  return callback
}
