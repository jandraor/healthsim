import * as deployment from "./deploymentSliders.ts";
import * as orders from "./orderSliders.ts";
import * as physicalDonation from "./physicalDonations.ts";
import * as financialDonation from "./financialDonations.ts"

export const deploymentSliders = params => {
    const callback = deployment.validate(params);
    return callback;
}

export const physicalDonationSliders = params => {
  const callback = physicalDonation.validate(params);
  return callback;
}

export const orderSliders = params => {
  const callback = orders.validate(params);
  return callback;
}

export const financialDonationSliders = params => {
  const callback = financialDonation.validate(params);
  return callback;
}
