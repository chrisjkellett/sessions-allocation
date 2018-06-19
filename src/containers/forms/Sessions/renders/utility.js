import {checkType} from './availability';

export const generateInputProps = (element, state, changeHandler, examiners) => {
  const {config} = element
  return {
    key: element.id,
    label: element.id,
    options: examinerCheck(element, examiners, config, state.session),
    elementtype: config.elementType,
    elementConfig: config.elementConfig,
    value: config.value,
    valid: config.validation.valid,
    shouldValidate: state.shouldValidate,
    change: (event, index) => changeHandler(event, config.elementType, element.id, index)
  }
}

export const examinerCheck = (element, examiners, config, session) => {
  if(element.id === 'examiners' && examiners !== null){
    return examiners
      .filter(e => !e.roles.includes('Support staff'))
      .filter(e => checkType(e, session.type.value))
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