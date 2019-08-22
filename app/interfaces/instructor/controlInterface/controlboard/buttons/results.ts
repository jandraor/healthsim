const $ = require('jquery');
import * as gameEvents from '../../../../../game_events/main.ts';

export const enable = () => {
    $('#bResults').prop('disabled', false);
}

export const light = () => {
  $('#bResults').attr('class', 'btn btn-primary btn-sm mt-2');
}

export const dim = () => {
  const resBtn = $('#bResults')
  resBtn.attr('class', 'btn btn-outline-light btn-sm mt-2');
  resBtn.html('Results')
}

export const onClick = socket => {
  $('#bResults').click(() => {
    $('#bResults').html('<i class="fa fa-spinner fa-spin"></i>');
    $('#bResults').prop('disabled', true);
    const stopTime = parseInt($('#lStopTime').text());
    const virusSeverity = parseFloat($('#lVirusSeverity').data('data'));

    const payload = {
      'stopTime': stopTime,
      'virusSeverity': virusSeverity
    }
    gameEvents.instructorEmitters.getBaseRun(socket, payload);
  });
}
