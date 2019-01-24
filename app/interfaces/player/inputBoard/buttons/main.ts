import * as submitDecisionsButton from "./submitDecisions.ts";

export const clickEvents = socket => {
  submitDecisionsButton.onClick(socket);
}

export const submitDecisions = {
  'enable': () => {
    submitDecisionsButton.enable();
  },
}
