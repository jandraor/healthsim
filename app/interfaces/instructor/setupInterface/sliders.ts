const $ = require('jquery');
import * as slds from "../../components/sliders.ts";

export const build = () => {
  const names = ['VirusSeverity']
  const slidersObject = names.map(elem => {
    const  sliderSpecs = {
      'sliderId': `sl${elem}`,
      'labelId': `l${elem}`,
    }
    return sliderSpecs
  });
  slds.build(slidersObject);
  roundSlider();
}

const roundSlider = () => {
  const callback = () => {
    const rounds = parseInt($('#lRounds').text());
    const select = $('#selInfectedTime');
    const optionValues = Array.from(Array(rounds).keys());
    select.html('');
    optionValues.forEach(value => {
      select.append($('<option>', {
          value: value,
          text : value
      }));
    });
  }
  const sliderSpecs = {
    'sliderId': `slRounds`,
    'labelId': `lRounds`,
    'callback': callback
  }
  slds.build([sliderSpecs]);
}
