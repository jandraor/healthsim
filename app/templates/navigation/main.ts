const $ = require('jquery');
import * as welcomeCont from './welcomeContent.ts';

export const welcome = session => {
  $('.hs-main').html(welcomeCont.html({session}));
}
