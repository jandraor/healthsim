const $ = require('jquery');
import * as sliders from "./sliders/main.ts";
import * as timers from "./timers.ts";
import * as events from "./events/main.ts";
import * as dashboard from './dashboard/main.ts';


export const buildGameInterface = (socket, teams) => {
  timers.countdown();
  sliders.build(teams);
  events.add(socket);
  dashboard.build();
}

export const disableSimButton = () => {
  $('#bSbmtDcsns').prop('disabled', true);
}
