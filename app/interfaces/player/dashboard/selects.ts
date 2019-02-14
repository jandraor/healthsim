const $ = require('jquery');
import * as select from "../../components/select.ts";
import * as data from "../data.ts";
import * as timeseries from "./timeseries.ts";
import * as help from './helpers/main.ts';

export const build = () => {
  //In each section there is a select input
  const paramsObject = data.sections.map(section => {
    const items = section.variables.map(variable => {
      const variableObject = {
        'value': variable.id,
        'text': variable.display
      }
      return variableObject
    })

    const params = {
      'items': items,
      'selectId': `selTS${section.id}`
    }

    return params;
  });

  paramsObject.forEach(params => {
    select.addOptions(params);
    onChange(params.selectId);
  });
  select.buildGroup('divDashboard');
}

const onChange = selectId => {
  $(`#${selectId}`).change(function() {
    const section = this.id.replace("selTS", "");
    const simulationResult = $('#lTeamId').data('data');

    if(!$.isEmptyObject(simulationResult)) {
      const variable = $(this).val();
      const dataset = help.applyInfoDelay(variable, section, simulationResult);
      const superDataset = [dataset];

      const params = {
        'svgId': `svgTS${section}`,
        'superDataset': superDataset,
        'idLine': `tsLineInfected${section}`
      }
      timeseries.draw(params);
    }

  })
}
