import * as intf1 from "./collection/1/1.ts";
const $ = require('jquery');

export const getContent = (modelId, fetchJSON) => {
  const id = String(modelId)

  switch(id){
    case '1':
     intf1.buildInterface(modelId, fetchJSON);
    break;
  }
}
