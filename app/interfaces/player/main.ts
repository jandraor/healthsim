const $ = require('jquery');
import * as gameEvents from '../../game_events/main.ts';


export const clickSendMessage = (socket) =>{
  $('#bSendMessage').click(() => {
    const message = {
      'text': $('#iptMessage').val()
    }
    $('#iptMessage').val('');
    gameEvents.playerEmitters.sendMessage(socket, message);
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

import * as sliders from "./slds.ts"
import * as timers from "./timers.ts"
export const buildGameInterface = (teams) => {
  timers.countdown();
  sliders.buildSliders(teams);
}
