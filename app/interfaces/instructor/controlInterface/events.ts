const $ = require('jquery');
import * as gameEvents from '../../../game_events/main.ts';

export const clickSimulate = (socket) => {
  $('#bSimulate').click(() => {
    const payload = {'hola': 'perro'}
    gameEvents.instructorEmitters.simulate(socket, payload);
  });
}

export const clickSendMessage = (socket) =>{
  $('#bSendMessage').click(() => {
    const payload = {
      'text': $('#iptMessage').val()
    }
    $('#iptMessage').val('');
    gameEvents.instructorEmitters.sendMessage(socket, payload);
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
