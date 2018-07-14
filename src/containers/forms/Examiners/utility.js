export const generateFormElementArray = (examiner) => {
  let formElementArray = [];

  for(let key in examiner){
    formElementArray.push({
      id: key,
      config: examiner[key]
    })
  }

  return formElementArray;
}


export const showHiddenFields = (obj) => {
  if(obj.roles.value.includes('Speaking Examiner')){
    return true;
  }else{
    return false;
  }
}

export const generateInputProps = (element, state, changeHandler) => {
  const {config} = element
  return {
    key: element.id,
    label: element.id,
    options: config.options,
    elementtype: config.elementType,
    elementConfig: config.elementConfig,
    value: config.value,
    hide: config.hide,
    showHidden: showHiddenFields(state.examiner),
    valid: config.validation.valid,
    shouldValidate: state.shouldValidate,
    change: (event, index) => changeHandler(event, config.elementType, element.id, index)
  }
}

export const examinerForAuth = ({email}) => {
  return {
    email: email.value,
    password: 'lenguasvivas',
    returnSecureToken: true
  }
}
