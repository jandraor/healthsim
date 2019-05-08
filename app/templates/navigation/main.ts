const $ = require('jquery');
import * as welcomeCont from './welcomeContent.ts';
import * as roles from './roles.ts';

export const welcome = session => {
  $('.hs-main').html(welcomeCont.html({session}));
}

export const playOptions = (is_Instructor) => {
  const html = roles.html({is_Instructor});
  $('.hs-main').html(html);
}
