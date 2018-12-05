const $ = require('jquery');
const Slider = require("bootstrap-slider");

export const build = slidersObject => {
  slidersObject.forEach(elem => {
    $(`#${elem.sliderId}`)
    .slider()
    .on("change", function() {
      $(`#${elem.labelId}`).text($(this).val());
      if(elem.callback){
        elem.callback();
      }
    });
  });//closes forEach
}
