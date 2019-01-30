import * as sendButton from './sendButton.ts';
import * as keyboard from './keyboard.ts';
const $ = require('jquery');

export const build = socket => {
  sendButton.onClick(socket);
  keyboard.onKeyPressing();
}

export const newMessage = () => {
  $('#divChatBoard').animate({scrollTop: 999999}, 250);
}
