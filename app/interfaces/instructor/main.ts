const $ = require('jquery');
import * as gameEvents from '../../game_events/main.ts';
import * as setupScreen from './setupInterface/main.ts';

export const clickSendMessage = (socket) =>{
  $('#bSendMessage').click(() => {
    const message = {
      'text': $('#iptMessage').val()
    }
    $('#iptMessage').val('');
    gameEvents.instructorEmitters.sendMessage(socket, message);
  });
}

export const pressAnyKey = () => {
  $(document).keypress(e => {
    if(e.which == 13) {
      if($('#iptMessage').is(":focus")){
        $('#bSendMessage').click();
      }
    }
  });
}

export const build = {
  'setupScreen':  (socket) => {
    setupScreen.build(socket);
  },
}
