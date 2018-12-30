const $ = require('jquery');
import * as sbmtBtt from './submitButton.ts';
import * as iptR0 from './inputsR0.ts';
import * as iptDep1 from './inputsDeploy1.ts';
import * as iptDep2 from './inputsDeploy2.ts';
import * as iptDep3 from './inputsDeploy3.ts';
import * as iptFin from './inputsFinancial.ts';
import * as mdlAntDon from './antiviralDonations.ts';
import * as mdlVacDon from './vaccineDonations.ts';
import * as mdlVenDon from './ventilatorDonations.ts';
import * as mdlFinDon from './financialDonations.ts';
import * as iptTm from './teamInput.ts';

export const build = options => {
  const otherTeams = options.otherTeams;
  const submitButtonHtml = sbmtBtt.html();
  $('#divRowIpt0').append(submitButtonHtml);
  const inputsR0Html = iptR0.html();
  $('#divRowIpt0').append(inputsR0Html);
  //Antivirals
  const antiviralsAvailable = options.resources.antivirals;
  const inputDeploy1Html = iptDep1.html({antiviralsAvailable});
  $('#divDeploy').append(inputDeploy1Html);
  //Vaccines
  const vaccinesAvailable = options.resources.vaccines;
  const inputDeploy2Html = iptDep2.html({vaccinesAvailable});
  $('#divDeploy').append(inputDeploy2Html);
  //Ventilators
  const ventilatorsAvailable = options.resources.ventilators;
  const inputDeploy3Html = iptDep3.html({ventilatorsAvailable});
  $('#divDeploy').append(inputDeploy3Html);
  const inputFinancialHtml = iptFin.html();
  $('#divFinance').append(inputFinancialHtml);
  //Modals
  const modalAntiViralDonationsHtml = mdlAntDon.html();
  $('body').prepend(modalAntiViralDonationsHtml);
  const modalVaccineDonationsHtml = mdlVacDon.html();
  $('body').prepend(modalVaccineDonationsHtml);
  const modalVentilatorDonationsHtml = mdlVenDon.html();
  $('body').prepend(modalVentilatorDonationsHtml);
  const modalFinancialDonationsHtml = mdlFinDon.html();
  $('body').prepend(modalFinancialDonationsHtml);
  //Label in modal with id = mdlAntDonBody
  $('#lRemainingAnt').text('10000'); // this must change
  otherTeams.forEach(elem => {
    const options = {
      'name': elem,
      'max': 10000,
      'labelClass': 'lAntDon',
      'labelName': `lAntDon${elem}`,
      'sliderClass': 'slAntDon',
      'sliderName': `slAntDon${elem}`
    }
    const inputTeamHtml = iptTm.html({options});
    $('#mdlAntDonBody').append(inputTeamHtml);
  });
  //Label in modal with id = mdlVacDonBody
  $('#lRemainingVac').text('10000'); //this must change
  otherTeams.forEach(elem => {
    const options = {
      'name': elem,
      'max': 10000,
      'labelClass': 'lVacDon',
      'labelName': `lVacDon${elem}`,
      'sliderClass': 'slVacDon',
      'sliderName': `slVacDon${elem}`
    }
    const inputTeamHtml = iptTm.html({options});
    $('#mdlVacDonBody').append(inputTeamHtml);
  });
  //Label in modal with id = mdlVenDonBody
  $('#lRemainingVen').text('10000'); //this must change
  otherTeams.forEach(elem => {
    const options = {
      'name': elem,
      'max': 10000,
      'labelClass': 'lVenDon',
      'labelName': `lVenDon${elem}`,
      'sliderClass': 'slVenDon',
      'sliderName': `slVenDon${elem}`
    }
    const inputTeamHtml = iptTm.html({options});
    $('#mdlVenDonBody').append(inputTeamHtml);
  });
  //Label in modal with id = mdlFinDonBody
  $('#lFinAvl').text('10000'); //this should change
  otherTeams.forEach(elem => {
    const options = {
      'name': elem,
      'max': 10000,
      'labelClass': 'lFinDon',
      'labelName': `lFinDon${elem}`,
      'sliderClass': 'slFinDon',
      'sliderName': `slFinDon${elem}`
    }
    const inputTeamHtml = iptTm.html({options});
    $('#mdlFinDonBody').append(inputTeamHtml);
  });
}
