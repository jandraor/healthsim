const $ = require('jquery');
import * as sbmtBtt from './submitButton.ts';
import * as iptR0 from './inputsR0.ts';
import * as iptDep from './inputsDeployTemplate.ts';
import * as iptFin from './inputsFinancial.ts';
import * as mdlFinDon from './financialDonations.ts';
import * as iptTm from './teamInput.ts';
import * as orderTemplate from './orderResourceTemplate.ts'
import * as donModTemplate from './donationsModalTemplate.ts';
import * as ut from '../../../../helpers/utilities.ts';

export const build = options => {
  const otherTeams = options.otherTeams;
  const submitButtonHtml = sbmtBtt.html();
  $('#divRowIpt0').append(submitButtonHtml);
  const inputsR0Html = iptR0.html();
  $('#divRowIpt0').append(inputsR0Html);
  //============================================================================
  //Antivirals
  //============================================================================
  const antSpoilageRate = options.spoilageRates.antivirals;
  const antStock = options.resources.antivirals;
  const antiviralsAvailable = Math.floor(ut.findDepletingConst(antStock,
    antSpoilageRate, 1));
  //Modal
  let params = {
    'prefix': 'Ant',
    'resource': 'Antivirals',
    'availableResources': antiviralsAvailable,
    'title': 'Antiviral'
  }
  const modalAntiViralDonationsHtml = donModTemplate.html({params});
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
  const inputDeploy1Html = iptDep.html({params});
  $('#divDeploy').append(inputDeploy1Html);
  //============================================================================
  //Vaccines
  //============================================================================
  const vacSpoilageRate = options.spoilageRates.vaccines;
  const vacStock = options.resources.vaccines;
  const vaccinesAvailable = Math.floor(ut.findDepletingConst(vacStock,
    vacSpoilageRate, 1));
  //Modal-----------------------------------------------------------------------
  params = {
    'prefix': 'Vac',
    'resource': 'Vaccines',
    'availableResources': vaccinesAvailable,
    'title': 'Vaccine'
  }
  const modalVaccineDonationsHtml = donModTemplate.html({params});
  $('body').prepend(modalVaccineDonationsHtml);
 //-----------------------------------------------------------------------------
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
  const inputDeploy2Html = iptDep.html({params});
  $('#divDeploy').append(inputDeploy2Html);
  //============================================================================
  //Ventilators
  //============================================================================
  const venSpoilageRate = options.spoilageRates.ventilators;
  const venStock = options.resources.ventilators;
  const ventilatorsAvailable = Math.floor(ut.findDepletingConst(venStock,
    venSpoilageRate, 1));
  //Modal
  params = {
    'prefix': 'Ven',
    'resource': 'Ventilators',
    'availableResources': ventilatorsAvailable,
    'title': 'Ventilator'
  }
  const modalVentilatorDonationsHtml = donModTemplate.html({params});
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
  const inputDeploy3Html = iptDep.html({params});
  $('#divDeploy').append(inputDeploy3Html);
  //============================================================================
  //Financial resources
  //============================================================================
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
  const modalFinancialDonationsHtml = mdlFinDon.html({finResources});
  $('body').prepend(modalFinancialDonationsHtml);
  otherTeams.forEach(elem => {
    const options = {
      'name': elem,
      'max': finResources,
      'labelClass': 'lFinDon',
      'labelName': `lFinDon${elem}`,
      'sliderClass': 'slFinDon',
      'sliderName': `slFinDon${elem}`
    }
    const inputTeamHtml = iptTm.html({options});
    $('#mdlFinDonBody').append(inputTeamHtml);
  });
}
