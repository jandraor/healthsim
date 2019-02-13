const $ = require('jquery');
import * as slds from "../../components/sliders.ts";

export const build = () => {
  const names = ['Rounds', 'VirusSeverity']
  const slidersObject = names.map(elem => {
    const  sliderSpecs = {
      'sliderId': `sl${elem}`,
      'labelId': `l${elem}`,
    }
    return sliderSpecs
  });
  slds.build(slidersObject);
}
