const $ = require('jquery');
import * as gameEvents from '../../../../../game_events/main.ts';
import * as simulateButton from "./simulate.ts";
import * as timer from "../timer.ts";

export const onClick = socket => {
  $('#bNewRound').click(() => {
    timer.stop();
    timer.start();
    //Deactivate this button
    $('#bNewRound').prop('disabled', true);
    //Emit event 'new round'
    gameEvents.instructorEmitters.newRound(socket);
  });
}

export const enable = () => {
    $('#bNewRound').prop('disabled', false);
}
