import * as data from './data.ts'

//This should be replaced by a database
export const getRVariables = (variableId, section, team) => {
  // const sectionObject = data.sections.filter(sectionObject => {
  //   return sectionObject.id === section;
  // });
  const sectionObject = getSectionObject(section);

  const variableObject = sectionObject.variables.filter(variableObject => {
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

export const getSectionObject = section => {
  const sectionObject = data.sections.filter(sectionObject => {
    return sectionObject.id === section;
  });
  return sectionObject[0]
}

export const isDelayed = (variableId, section) => {
  const sectionObject = getSectionObject(section);
  const variableObject = sectionObject.variables.filter(variableObject => {
    return variableObject.id === variableId;
  });
  return variableObject[0].delay
}

export const getPhysicalResources = () => {
  const sectionObject = getSectionObject('Resources');
  const variableObject = sectionObject.variables.filter(variable => {
    return variable.type === 'physical'
  });
  return variableObject;
}
