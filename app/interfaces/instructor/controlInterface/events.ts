const $ = require('jquery');
import * as gameEvents from '../../../game_events/main.ts';

// export const clickSimulate = socket => {
//   $('#bSimulate').click(() => {
//     fillEmptyDecisions();
//     $('#bSimulate').html('<i class="fa fa-spinner fa-spin"></i>');
//     $('#bSimulate').prop('disabled', true);
//     const payload = {
//       'startTime': 0,
//       'finishTime': 1,
//       'policyMatrix': brewPolicyMatrix(),
//     }
//     gameEvents.instructorEmitters.simulate(socket, payload);
//   });
// }

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

// const brewPolicyMatrix = () => {
//   let policyMatrix = [];
//   $('.icnDecisions').each(function() {
//     const team = this.id.replace('icnDes', '');
//     const dataSentbyTeam = $(`#${this.id}`).data();
//     const financialDonations = dataSentbyTeam.donations.financialResources;
//     const antiviralDonations = dataSentbyTeam.donations.antivirals;
//     const vaccineDonations = dataSentbyTeam.donations.vaccines;
//     const ventilatorDonations = dataSentbyTeam.donations.ventilators;
//     const teamData = dataSentbyTeam.deployment;
//     teamData['ResourcesDonated'] = calculateTotalDonations(financialDonations);
//     teamData['AntiviralsShared'] = calculateTotalDonations(antiviralDonations);
//     teamData['VaccinesShared'] = calculateTotalDonations(vaccineDonations);
//     teamData['VentilatorsShared'] = calculateTotalDonations(ventilatorDonations);
//     teamData['ResourcesReceived'] = calculateReceivedDonations(team, 'financialResources');
//     teamData['AntiviralsReceived'] = calculateReceivedDonations(team, 'antivirals');
//     teamData['VaccinesReceived'] = calculateReceivedDonations(team, 'vaccines');
//     teamData['VentilatorsReceived'] = calculateReceivedDonations(team, 'ventilators');
//     policyMatrix.push(teamData);
//   })
//   return policyMatrix;
// }
//
// const calculateTotalDonations = donations => {
//   const sumValue = Object.values(donations)
//     .reduce((a:number, b:number) => a + b);
//   return sumValue;
// }
//
// const calculateReceivedDonations = (team, resourceType) => {
//   let sumValue = 0;
//   $('.icnDecisions').each(function() {
//     const team2 = this.id.replace('icnDes', '');
//     if(team != team2) {
//       const team2Data = $(`#${this.id}`).data();
//       const donationReceived = team2Data.donations[resourceType][team];
//       sumValue = sumValue + donationReceived;
//     }
//   });
//
//   return sumValue;
// }
//
// const zeroDonationObjectGenerator = team => {
//   const zeroDonationObj = {};
//   $(`.tdTeamName`).each(function() {
//     const receivingTeam = this.id.replace('tdTeamName', "");
//     if(team != receivingTeam) {
//       zeroDonationObj[receivingTeam] = 0;
//     }
//   });
//   return zeroDonationObj;
// }
//
// const fillEmptyDecisions = () => {
//   $('.icnDecisions').each(function() {
//     const decisions = $(this).data();
//
//     if($.isEmptyObject(decisions)){
//       const team = this.id.replace('icnDes', "");
//       const zeroDonationsObj = zeroDonationObjectGenerator(team);
//       const fillObject = {
//         'deployment': {
//           'VaccinationPolicy': 0,
//           'AntiviralPolicy': 0,
//           'VentilatorPolicy': 0,
//           'QuarantinePolicy': 0,
//           'VaccineBudgetProportion': 0,
//           'AntiviralBudgetProportion': 0,
//           'VentilatorBudgetProportion': 0,
//           'VaccinesOrdered': 0,
//           'VaccineUsageFraction': 0,
//           'AntiviralsOrdered': 0,
//           'AntiviralsUsageFraction': 0,
//           'VentilatorsOrdered': 0,
//           'VentilatorsUsageFraction': 0,
//         },
//         'donations': {
//           'financialResources': zeroDonationsObj,
//           'vaccines': zeroDonationsObj,
//           'antivirals': zeroDonationsObj,
//           'ventilators': zeroDonationsObj,
//         }
//       }
//       $(this).data(fillObject);
//     }
//   });
// }
