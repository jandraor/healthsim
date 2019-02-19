import * as slds from "../../../components/sliders.ts";
import * as validate from "./checks/main.ts";
import * as queries from '../../objectQueries.ts';
const $ = require('jquery');

export const build = teams => {
  const physicalResources = ['Ant', 'Vac', 'Ven'];
  const otherTeams = teams.otherTeams;
  //Sliders in the modals(pop-ups) for donation of antivirals, vaccines & ventilators
  physicalResources.forEach(resource => {

    const sldResDon = otherTeams.map(otherTeam => {

      const params = {
        'sliderId': `sl${resource}Don${otherTeam}`,
        'labelMaxValue': `lblInv${resource}`,
        'labelClass': `l${resource}Don`,
        'lUnallocated': `lRemaining${resource}`,
        'lSum': `l${resource}TotalDon`,
        'lStock': `lStock${resource}`,
        'sldDepId': `slDep${resource}`,
        'lResourcesToUse': `lDep${resource}`
      }

      const sliderObject = {
        'sliderId': `sl${resource}Don${otherTeam}`, //eg. slAntDonBeta
        'labelId': `l${resource}Don${otherTeam}`,
        'callback': validate.physicalDonationSliders(params),
      }
      return sliderObject;
    });
    slds.build(sldResDon);
  });

  //Sliders in the modal(popup) for donation of financial resources
  const sldFinDon = otherTeams.map(elem => {
    const sliderId = `slFinDon${elem}`

    const params = {
      'sliderId': sliderId,
      'labelMaxValue': 'lblInvFin',
      'labelClass': 'lFinDon',
      'lUnallocatedClass': 'lUnallocatedFin',
      'lSum': 'lFinTotalDon',
      'lStock': 'lStockFin',
    }
    const sliderObject = {
      'sliderId': sliderId,
      'labelId': `lFinDon${elem}`,
      'callback': validate.financialDonationSliders(params),
    }
    return sliderObject;
  });
  slds.build(sldFinDon);
  //============================================================================
  const sliderObject = [];

  physicalResources.forEach(resource => {
    const params = {
      'lResourcesToUse': `lDep${resource}`,
      'lDonations': `l${resource}TotalDon`,
      'lStock': `lStock${resource}`,
      'lAvlDon': `lblInv${resource}`,
      'lUnallocated': `lRemaining${resource}`,
      'sliderClass': `sl${resource}Don`
    }

    const deploymentSlider = {
      'sliderId': `slDep${resource}`,
      'labelId': `lDep${resource}`,
      'callback': validate.deploymentSliders(params)
    }

    sliderObject.push(deploymentSlider)
  })
  //============================================================================
  physicalResources.forEach(resource => {
    const sliderId = `slOrd${resource}`;

    const params = {
      'sliderId': sliderId,
      'lUnitCostId': `lUnitCost${resource}`,
      'lTotalCost': `lTotCost${resource}`,
      'lUnallocatedClass': 'lUnallocatedFin',
      'lDonations': 'lFinTotalDon',
      'lStock': 'lStockFin',
      'lSum': 'lSpent',
      'lAvlDon': 'lblInvFin',
      'orderSliders': 'slOrd',
      'donationSliders': 'slFinDon',
    }

    const orderSlider = {
      'sliderId': sliderId,
      'labelId': `lOrd${resource}`,
      'callback': validate.orderSliders(params),
    }
    sliderObject.push(orderSlider);
  });

  slds.build(sliderObject);
}

export const setMaxLimits = params => {
  const sectionObject = queries.getSectionObject('Resources');
  const team = $('#lTeamId').text();
  sectionObject.variables.forEach(variable => {
    const prefix = variable.id.substring(0,3);
    const rVariable = queries.getRVariables(variable.id, 'Resources', team);
    const deployMax = Math.floor(params[rVariable]);

    //modals
    $(`.sl${prefix}Don`).each(function() {
      const teamDonationSlider = $(this);
      const sliderName = this.id;
      teamDonationSlider.slider('setAttribute', 'max', deployMax);
      teamDonationSlider.slider('setValue', 0, true, true);
      $(`#l${sliderName}Max`).text(deployMax);
    });

    if(variable.id != 'Financial') {
      const deploySlider = $(`#slDep${prefix}`);
      deploySlider.slider('setAttribute', 'max', deployMax);
      deploySlider.slider('setValue', 0, true, true);
      $(`#lslDep${prefix}Max`).text(deployMax);
    }

    if(variable.id === 'Financial'){
      const physicalResources = ['Ant', 'Vac', 'Ven'];
      physicalResources.forEach(resource => {
        const resourceOrderSlider = $(`#slOrd${resource}`);
        const unitCost = parseInt($(`#lUnitCost${resource}`).text())
        const maxOrder = Math.floor(deployMax / unitCost);
        resourceOrderSlider.slider('setAttribute', 'max', maxOrder);
        resourceOrderSlider.slider('setValue', 0, true, true);
        $(`#lslOrd${resource}Max`).text(maxOrder);
      });
    }
  });
}
