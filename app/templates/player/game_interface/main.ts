const $ = require('jquery');
import * as layout from './layout.ts';
import * as prgBar from './progressBar.ts';
import * as dashboard from './dashboard/main.ts';
import * as inputBoard from './inputDecisions/main.ts';
import * as chatboard from './chat/main.ts';

export const build = params => {
  const layoutHtml = layout.html();
  $('body').html(layoutHtml);
  const progressBarHtml = prgBar.html();
  $('#divProgress').html(progressBarHtml);
  inputBoard.build(params);
  dashboard.build(params);
  chatboard.build();
}

export const addMessage = message => {
  chatboard.addMessage(message);
}
