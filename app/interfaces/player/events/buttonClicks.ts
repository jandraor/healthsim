const $ = require('jquery');
import * as gameEvents from '../../../game_events/main.ts';


export const clickSendMessage = socket =>{
  $('#bSendMessage').click(() => {
    const message = {
      'text': $('#iptMessage').val()
    }
    $('#iptMessage').val('');
    gameEvents.playerEmitters.sendMessage(socket, message);
  });
}

export const submitDecisions = socket => {
  $('#bSbmtDcsns').click(function () {
    const payload = {
      'VaccinationPolicy': 0,
      'AntiviralPolicy': 0,
      'VentilatorPolicy': 0,
      'QuarantinePolicy': 0,
      'VaccineBudgetProportion': 0.5,
      'AntiviralBudgetProportion': 0.3,
      'VentilatorBudgetProportion': 0.2,
      'ResourcesDonated': 0,
      'ResourcesReceived': 0,
      'VaccinesShared': 0,
      'VaccinesOrdered': 0,
      'VaccineUsageFraction': 0.5,
      'VaccinesReceived': 0,
      'AntiviralsShared': 0,
      'AntiviralsOrdered': 0,
      'AntiviralsUsageFraction': 1,
      'AntiviralsReceived': 0,
      'VentilatorsShared': 0,
      'VentilatorsOrdered': 0,
      'VentilatorsUsageFraction': 1,
      'VentilatorsReceived': 0
    }
    gameEvents.playerEmitters.sendDecisions(socket, payload);
  });
}
