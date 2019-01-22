import * as data from './data.ts'

//This should be replaced by a database
export const getRVariables = (variableId, section, team) => {
  const sectionObject = data.sections.filter(sectionObject => {
    return sectionObject.id === section;
  });

  const variableObject = sectionObject[0].variables.filter(variableObject => {
    return variableObject.id === variableId;
  });

  const RName = variableObject[0].RName;

  let yVariable;
  if(typeof(RName) === 'string') {
    yVariable = `${team}${RName}`;
  }

  if(Array.isArray(RName)) {
    yVariable = RName.map(variable => {
      return `${team}${variable}`
    })
  }

  return yVariable;
}
