export const generateInputProps = (element, state, changeHandler, examiners) => {
  const {config} = element
  return {
    key: element.id,
    label: element.id,
    options: examinerCheck(element, examiners, config),
    elementtype: config.elementType,
    elementConfig: config.elementConfig,
    value: config.value,
    valid: config.validation.valid,
    shouldValidate: state.shouldValidate,
    change: (event, index) => changeHandler(event, config.elementType, element.id, index)
  }
}

export const examinerCheck = (element, examiners, config) => {
  if(element.id === 'examiners' && examiners !== null){
    return examiners
      .filter(e => !e.roles.includes('Support staff'))
      .map(e => e.name);
  }

  else if(element.id === 'support' && examiners !== null){
    return examiners
      .filter(e => e.roles.includes('Support staff'))
      .map(e => e.name);
  }
  
  else{
    return config.options;
  }
}