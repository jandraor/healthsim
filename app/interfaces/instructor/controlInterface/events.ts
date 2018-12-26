const $ = require('jquery');
import * as gameEvents from '../../../game_events/main.ts';

export const clickSimulate = (socket) => {
  $('#bSimulate').click(() => {
    $('#bSimulate').html('<i class="fa fa-spinner fa-spin"></i>');
    const payload = brewPolicyMatrix();
    gameEvents.instructorEmitters.sendPolicyMatrix(socket, payload);
    //gameEvents.instructorEmitters.simulate(socket, payload);
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

const brewPolicyMatrix = () => {
  let policyMatrix = [];
  $('.icnDecisions').each(function() {
    policyMatrix.push($(`#${this.id}`).data());
  })
  console.log('Matrix2====================================');
  console.log(policyMatrix);
  console.log('Matrix2====================================');
  return policyMatrix;
}
