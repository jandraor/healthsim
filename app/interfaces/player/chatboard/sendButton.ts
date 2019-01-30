const $ = require('jquery');
import * as gameEvents from '../../../game_events/main.ts';

export const onClick = socket => {
  $('#bSendMessage').click(() => {
    const message = {
      'text': $('#iptMessage').val()
    }
    $('#iptMessage').val('');
    gameEvents.playerEmitters.sendMessage(socket, message);
  });
}
