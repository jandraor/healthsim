const $ = require('jquery');
import * as select from '../../components/select.ts';
import * as domEvents from './events.ts';
import * as sliders from "./sliders.ts"

const addSelect = () => {
  select.buildSelects();
}

export const build = (socket) => {
  domEvents.clickStartGame(socket);
  select.buildSelects();
  sliders.build();
}
