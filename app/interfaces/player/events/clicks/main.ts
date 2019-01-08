import * as submitDecisions from "./submitDecisions.ts";
import * as confirmDonations from "./confirmDonations.ts"

export const add = socket => {
  submitDecisions.build(socket);
  confirmDonations.build();
}
