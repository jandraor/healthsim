const $ = require('jquery');
import * as prvPol from './privacyPolicy.ts';

export const privacyPolicy = () => {
  $('.hs-main').html(prvPol.html());
}
