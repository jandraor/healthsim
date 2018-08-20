const $ = require('jquery');
const Slider = require("bootstrap-slider");

export const buildSliders = () => {

  $("#slInfected").slider();
  $("#slInfected").on("slide", function(slideEvt) {
 	$("#lInfected").text(slideEvt.value);
  });

  const ContactRateSlider = new Slider("#slContactRate");
  ContactRateSlider.on("slide", sliderValue => {
    document.getElementById("lContactRate").textContent = sliderValue;
  });

  const InfectivitySlider = new Slider("#slInfectivity");
  InfectivitySlider.on("slide", sliderValue => {
    document.getElementById("lInfectivity").textContent = sliderValue;
  });

  const RecoveryDelaySlider = new Slider("#slRecoveryDelay");
  RecoveryDelaySlider.on("slide", sliderValue => {
    document.getElementById("lRecoveryDelay").textContent = sliderValue;
  });
}
