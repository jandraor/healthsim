const $ = require('jquery');
const Slider = require("bootstrap-slider");

/**
 * Converts an input text into slider thanks to bootstrap-slider.
 * @param {Array<Object>} sliderObject - Each object corresponds to the parameters of each slider.
 * @param {string} sliderObject[].sliderId - Id of the text input.
 * @param {string} sliderObject[].labelId - Id of the label that displays the slider's current value.
 * @callback sliderObject[].callback
 */
export const build = slidersObject => {
  slidersObject.forEach(elem => {

    if(elem.sliderId === undefined) {
      throw(`sliderId undefined`);
    }

    if(elem.labelId === undefined) {
      throw(`labelId undefined`);
    }

    $(`#${elem.sliderId}`)
    .slider()
    .on("change", function() {
      $(`#${elem.labelId}`).text($(this).val());
      if(elem.callback){
        elem.callback();
      }
    });
  });
}
