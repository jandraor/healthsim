const $ = require('jquery');
import * as sliders from "./slds.ts"
import * as timers from "./timers.ts"
import * as events from "./events/main.ts"


export const buildGameInterface = (socket, teams) => {
  timers.countdown();
  sliders.buildSliders(teams);
  events.add(socket);
}

export const disableSimButton = () => {
  $('#bSbmtDcsns').prop('disabled', true);
}
