import * as intf1 from "./collection/1/main.ts";
import * as inst from "./instructor/main.ts";
import * as plyr from "./player/main.ts";
const $ = require('jquery');

export const getContent = (modelId, fetchJSON) => {
  const id = String(modelId)

  switch(id){
    case '1':
     intf1.buildInterface(modelId, fetchJSON);
    break;
  }
}

export const instructor = () => {
  return inst;
}

export const player = () => {
  return plyr;
}
