const $ = require('jquery');
import * as gameEvents from '../../game_events/main.ts';

export const clickStartGame = (socket) => {
  $('#bStartGame').click(() => {
    const [view, ...params] = window.location.hash.split('/');
    const gameId = params[0];
    gameEvents.instructorEmitters.startGame(socket, gameId);
  });
}

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
