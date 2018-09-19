const $ = require('jquery');
const Slider = require("bootstrap-slider");

export const build = slidersObject => {
  slidersObject.forEach(elem => {
    $(`#${elem.sliderId}`)
    .slider()
    .on("slide", (slideEvt) => {
      $(`#${elem.labelId}`).text(slideEvt.value);
      if(elem.callback){
        elem.callback();
      }
    });
  });//closes forEach
}
