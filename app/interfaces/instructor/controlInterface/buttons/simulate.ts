const $ = require('jquery');
import * as gameEvents from '../../../../game_events/main.ts';

export const onClick = socket => {
  $('#bSimulate').click(() => {
    fillEmptyDecisions();
    $('#bSimulate').html('<i class="fa fa-spinner fa-spin"></i>');
    $('#bSimulate').prop('disabled', true);
    const currentRound = parseInt($('#lCurrentRound').text());
    const stepStartTime = currentRound - 1;
    const stepStopTime = currentRound;
    const policySummary = brewPolicySummary(stepStartTime, stepStopTime);

    const payload = {
      'startTime': stepStartTime,
      'finishTime': stepStopTime,
      'policyMatrix': policySummary.policyMatrix,
      'donations': policySummary.donations,
    }
    gameEvents.instructorEmitters.simulate(socket, payload);
  });
}

const brewPolicySummary = (startTime, stopTime) => {
  const policySummary = {
    'policyMatrix': null,
    'donations': null,
  }

  let policyMatrix = [];
  let donations = [];
  $('.icnDecisions').each(function() {
    const team = this.id.replace('icnDes', '');
    const dataSentbyTeam = $(`#${this.id}`).data();
    //--------------------------------------------------------------------------
    const teamDonations = dataSentbyTeam.donations;
    const resources = Object.keys(teamDonations);

    resources.forEach(resource => {
      const resourceObject = teamDonations[resource];
      const otherTeams = Object.keys(resourceObject);
      const template = {
        'from': team,
        'to': null,
        'resource': resource,
        'amount': null,
        'startTime': startTime,
        'stopTime': stopTime,
      };

      //------------------------------------------------------------------------
      const selfDonation = Object.assign({}, template)
      selfDonation.to = team;
      selfDonation.amount = 0;
      donations.push(selfDonation);
      //------------------------------------------------------------------------

      otherTeams.forEach(otherTeam => {
        const row = Object.assign({}, template);
        row.to = otherTeam;
        row.amount = resourceObject[otherTeam];
        donations.push(row);
      })
    });

    const financialDonations = dataSentbyTeam.donations.Financial;
    const antiviralDonations = dataSentbyTeam.donations.Antivirals;
    const vaccineDonations = dataSentbyTeam.donations.Vaccines;
    const ventilatorDonations = dataSentbyTeam.donations.Ventilators;

    //--------------------------------------------------------------------------
    const teamData = dataSentbyTeam.deployment;
    teamData['ResourcesDonated'] = calculateTotalDonations(financialDonations);
    teamData['AntiviralsShared'] = calculateTotalDonations(antiviralDonations);
    teamData['VaccinesShared'] = calculateTotalDonations(vaccineDonations);
    teamData['VentilatorsShared'] = calculateTotalDonations(ventilatorDonations);
    teamData['ResourcesReceived'] = calculateReceivedDonations(team, 'Financial');
    teamData['AntiviralsReceived'] = calculateReceivedDonations(team, 'Antivirals');
    teamData['VaccinesReceived'] = calculateReceivedDonations(team, 'Vaccines');
    teamData['VentilatorsReceived'] = calculateReceivedDonations(team, 'Ventilators');
    policyMatrix.push(teamData);
  });
  policySummary.policyMatrix = policyMatrix;
  policySummary.donations = donations;

  return policySummary
}

const calculateTotalDonations = donations => {
  const sumValue = Object.values(donations)
    .reduce((a:number, b:number) => a + b);
  return sumValue;
}

const calculateReceivedDonations = (team, resourceType) => {
  let sumValue = 0;
  $('.icnDecisions').each(function() {
    const team2 = this.id.replace('icnDes', '');
    if(team != team2) {
      const team2Data = $(`#${this.id}`).data();
      const donationReceived = team2Data.donations[resourceType][team];
      sumValue = sumValue + donationReceived;
    }
  });

  return sumValue;
}

const zeroDonationObjectGenerator = team => {
  const zeroDonationObj = {};
  $(`.tdTeamName`).each(function() {
    const receivingTeam = this.id.replace('tdTeamName', "");
    if(team != receivingTeam) {
      zeroDonationObj[receivingTeam] = 0;
    }
  });
  return zeroDonationObj;
}

const fillEmptyDecisions = () => {
  $('.icnDecisions').each(function() {
    const decisions = $(this).data();

    if($.isEmptyObject(decisions)){
      const team = this.id.replace('icnDes', "");
      const zeroDonationsObj = zeroDonationObjectGenerator(team);
      const fillObject = {
        'deployment': {
          'VaccinationPolicy': 0,
          'AntiviralPolicy': 0,
          'VentilatorPolicy': 0,
          'QuarantinePolicy': 0,
          'VaccineBudgetProportion': 0,
          'AntiviralBudgetProportion': 0,
          'VentilatorBudgetProportion': 0,
          'VaccinesOrdered': 0,
          'VaccineUsageFraction': 0,
          'AntiviralsOrdered': 0,
          'AntiviralsUsageFraction': 0,
          'VentilatorsOrdered': 0,
          'VentilatorsUsageFraction': 0,
        },
        'donations': {
          'Financial': zeroDonationsObj,
          'Vaccines': zeroDonationsObj,
          'Antivirals': zeroDonationsObj,
          'Ventilators': zeroDonationsObj,
        }
      }
      $(this).data(fillObject);
    }
  });
}

export const enable = () => {
    $('#bSimulate').prop('disabled', false);
}
