const $ = require('jquery');
import * as gameEvents from '../../../../game_events/main.ts';

export const build = socket => {
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
    // Available resources
    const avlResources = parseInt($('#lFunds').text());
    //--------------------------------------------------------------------------
    const vaccinesOrdered = parseInt($('#lOrdVac').text());
    const vaccinesOrderedCost = parseInt($('#lTotCostVac').text());
    const vaccineBudgetProportion = vaccinesOrderedCost / avlResources;
    //--------------------------------------------------------------------------
    const antiviralsOrdered = parseInt($('#lOrdAnt').text());
    const antiviralsOrderedCost = parseInt($('#lTotCostAnt').text());
    const antiviralsBudgetProportion = antiviralsOrderedCost / avlResources;
    //--------------------------------------------------------------------------
    const ventilatorsOrdered = parseInt($('#lOrdVen').text());
    const ventilatorsOrderedCost = parseInt($('#lTotCostVen').text());
    const ventilatorsBudgetProportion = ventilatorsOrderedCost / avlResources;
    //--------------------------------------------------------------------------
    const payload = {
      'deployment': {
        'VaccinationPolicy': 0,
        'AntiviralPolicy': 0,
        'VentilatorPolicy': 0,
        'QuarantinePolicy': quarantinePolicy,
        'VaccineBudgetProportion': vaccineBudgetProportion,
        'AntiviralBudgetProportion': antiviralsBudgetProportion,
        'VentilatorBudgetProportion': ventilatorsBudgetProportion,
        'VaccinesOrdered': vaccinesOrdered,
        'VaccineUsageFraction': vaccineUsageFraction,
        'AntiviralsOrdered': antiviralsOrdered,
        'AntiviralsUsageFraction': antiviralsUsageFraction,
        'VentilatorsOrdered': ventilatorsOrdered,
        'VentilatorsUsageFraction': ventilatorsUsageFraction,
      },
      'donations': {
        'financialResources': donationObjectGenerator('lFinDon'),
        'vaccines': donationObjectGenerator('lVacDon'),
        'antivirals': donationObjectGenerator('lAntDon'),
        'ventilators': donationObjectGenerator('lVenDon'),
      }
    }
    gameEvents.playerEmitters.sendDecisions(socket, payload);
  });
}

const donationObjectGenerator = labelClass => {
  const resourcesDonated = {};
  $(`.${labelClass}`).each(function() {
    const donationValue = parseInt($(`#${this.id}`).text());
    const receivingTeam = this.id.replace(labelClass, "");
    resourcesDonated[receivingTeam] = donationValue;
  });
  return resourcesDonated;
}
