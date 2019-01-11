import * as slds from "../../components/sliders.ts";
import * as validate from "./checks/main.ts"

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
        'lStock': `l${resource}Avl`,
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
      'labelMaxValue': 'lblInvFin2',
      'labelClass': 'lFinDon',
      'lUnallocatedClass': 'lUnallocatedFin',
      'lSum': 'lFinTotalDon',
      'lStock': 'lFunds',
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
      'lStock': `l${resource}Avl`,
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
      'lStock': 'lFunds',
      'lSum': 'lSpent',
      'lAvlDon': 'lblInvFin2',
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
