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
import * as orderTemplate from './orderResourceTemplate.ts'

export const build = options => {
  const otherTeams = options.otherTeams;
  const submitButtonHtml = sbmtBtt.html();
  $('#divRowIpt0').append(submitButtonHtml);
  const inputsR0Html = iptR0.html();
  $('#divRowIpt0').append(inputsR0Html);
  //============================================================================
  //Antivirals
  //============================================================================
  const antiviralsAvailable = Math.floor(options.resources.antivirals);
  //Modal
  const modalAntiViralDonationsHtml = mdlAntDon.html({antiviralsAvailable});
  $('body').prepend(modalAntiViralDonationsHtml);
  otherTeams.forEach(elem => {
    const options = {
      'name': elem,
      'max': antiviralsAvailable,
      'labelClass': 'lAntDon',
      'labelName': `lAntDon${elem}`,
      'sliderClass': 'slAntDon',
      'sliderName': `slAntDon${elem}`
    }
    const inputTeamHtml = iptTm.html({options});
    $('#mdlAntDonBody').append(inputTeamHtml);
  });
  //Inputs in main screen
  const inputDeploy1Html = iptDep1.html({antiviralsAvailable});
  $('#divDeploy').append(inputDeploy1Html);
  //============================================================================
  //Vaccines
  //============================================================================
  const vaccinesAvailable = Math.floor(options.resources.vaccines);
  //Modal
  const modalVaccineDonationsHtml = mdlVacDon.html({vaccinesAvailable});
  $('body').prepend(modalVaccineDonationsHtml);
  otherTeams.forEach(elem => {
    const options = {
      'name': elem,
      'max': vaccinesAvailable,
      'labelClass': 'lVacDon',
      'labelName': `lVacDon${elem}`,
      'sliderClass': 'slVacDon',
      'sliderName': `slVacDon${elem}`
    }
    const inputTeamHtml = iptTm.html({options});
    $('#mdlVacDonBody').append(inputTeamHtml);
  });
  //Inputs in main screen
  const inputDeploy2Html = iptDep2.html({vaccinesAvailable});
  $('#divDeploy').append(inputDeploy2Html);
  //============================================================================
  //Ventilators
  //============================================================================
  const ventilatorsAvailable = Math.floor(options.resources.ventilators);
  //Modal
  const modalVentilatorDonationsHtml = mdlVenDon.html({ventilatorsAvailable});
  $('body').prepend(modalVentilatorDonationsHtml);
  otherTeams.forEach(elem => {
    const options = {
      'name': elem,
      'max': ventilatorsAvailable,
      'labelClass': 'lVenDon',
      'labelName': `lVenDon${elem}`,
      'sliderClass': 'slVenDon',
      'sliderName': `slVenDon${elem}`
    }
    const inputTeamHtml = iptTm.html({options});
    $('#mdlVenDonBody').append(inputTeamHtml);
  });
  //Inputs in main screen
  const inputDeploy3Html = iptDep3.html({ventilatorsAvailable});
  $('#divDeploy').append(inputDeploy3Html);
  //Financial resources
  const finResources = Math.floor(options.resources.financial);
  const inputFinancialHtml = iptFin.html({finResources});
  $('#divFinance').append(inputFinancialHtml);
  const antiviralsCost = Math.round(options.unitCosts.antivirals);
  const vaccineCost = Math.round(options.unitCosts.vaccines);
  const ventilatorCost = Math.round(options.unitCosts.ventilators);
  const paramsObject = [
    {
      'resourceName': 'Antivirals',
      'idResource': 'Ant',
      'costUnit': antiviralsCost,
      'max': Math.floor(finResources / antiviralsCost),
    },
    {
      'resourceName': 'Vaccines',
      'idResource': 'Vac',
      'costUnit': vaccineCost,
      'max': Math.floor(finResources / vaccineCost),
    },
    {
      'resourceName': 'Ventilators',
      'idResource': 'Ven',
      'costUnit': ventilatorCost,
      'max': Math.floor(finResources / ventilatorCost),
    },
  ];
  paramsObject.map(params => {
    const orderTemplateHtml = orderTemplate.html({params});
    $('#divOrders').append(orderTemplateHtml);
  })
  //Modal
  const modalFinancialDonationsHtml = mdlFinDon.html();
  $('body').prepend(modalFinancialDonationsHtml);
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
