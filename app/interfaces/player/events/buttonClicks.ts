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
    const quarantinePolicy = $('#iptQuarantine').is(":checked") ? 1 : 0;
    //--------------------------------------------------------------------------
    const availableVaccines = parseInt($('#lVacAvl').text());
    const vaccinesToBeUsed = parseInt($('#lDepVac').text());;
    const vaccineUsageFraction = vaccinesToBeUsed / availableVaccines;
    //--------------------------------------------------------------------------
    const availableAntiVirals = parseInt($('#lAntAvl').text());
    const antiviralsToBeUsed = parseInt($('#lDepAnt').text());;
    const antiviralsUsageFraction = antiviralsToBeUsed / availableAntiVirals;
    //--------------------------------------------------------------------------
    const availableVentilators = parseInt($('#lVenAvl').text());
    const ventilatorsToBeUsed = parseInt($('#lDepVen').text());;
    const ventilatorsUsageFraction = ventilatorsToBeUsed / availableVentilators;
    //--------------------------------------------------------------------------
    const vaccinesOrdered = parseInt($('#lOrdVac').text());
    const vacUnitCost = 1;
    const vaccinesOrderedCost = vaccinesOrdered * vacUnitCost;
    const vaccineBudgetProportion = vaccinesOrderedCost / 100;
    //--------------------------------------------------------------------------
    const antiviralsOrdered = parseInt($('#lOrdAnt').text());
    const antUnitCost = 1;
    const antiviralsOrderedCost = antiviralsOrdered * antUnitCost;
    const antiviralsBudgetProportion = antiviralsOrderedCost / 100;
    //--------------------------------------------------------------------------
    const ventilatorsOrdered = parseInt($('#lOrdVen').text());
    const venUnitCost = 1;
    const ventilatorsOrderedCost = ventilatorsOrdered * venUnitCost;
    const ventilatorsBudgetProportion = ventilatorsOrderedCost / 100;
    const payload = {
      'VaccinationPolicy': 0,
      'AntiviralPolicy': 0,
      'VentilatorPolicy': 0,
      'QuarantinePolicy': quarantinePolicy,
      'VaccineBudgetProportion': vaccineBudgetProportion,
      'AntiviralBudgetProportion': antiviralsBudgetProportion,
      'VentilatorBudgetProportion': ventilatorsBudgetProportion,
      'ResourcesDonated': 0,
      'ResourcesReceived': 0,
      'VaccinesShared': 0,
      'VaccinesOrdered': vaccinesOrdered,
      'VaccineUsageFraction': vaccineUsageFraction,
      'VaccinesReceived': 0,
      'AntiviralsShared': 0,
      'AntiviralsOrdered': antiviralsOrdered,
      'AntiviralsUsageFraction': antiviralsUsageFraction,
      'AntiviralsReceived': 0,
      'VentilatorsShared': 0,
      'VentilatorsOrdered': ventilatorsOrdered,
      'VentilatorsUsageFraction': ventilatorsUsageFraction,
      'VentilatorsReceived': 0
    }
    gameEvents.playerEmitters.sendDecisions(socket, payload);
  });
}
