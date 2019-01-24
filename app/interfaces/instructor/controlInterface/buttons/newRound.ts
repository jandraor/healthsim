const $ = require('jquery');
import * as gameEvents from '../../../../game_events/main.ts';
import * as simulateButton from "./simulate.ts";

export const onClick = socket => {
  $('#bNewRound').click(() => {
    //Deactivate this button
    $('#bNewRound').prop('disabled', true);
    //Emit event 'new round'
    gameEvents.instructorEmitters.newRound(socket);
  });
}

export const enable = () => {
    $('#bNewRound').prop('disabled', false);
}
