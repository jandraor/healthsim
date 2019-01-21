import * as select from "../../components/select.ts";
import * as data from "./data.ts";

export const build = () => {
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
  });
  select.buildGroup('divDashboard');
}
