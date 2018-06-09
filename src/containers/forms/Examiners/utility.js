
export const updateState = (obj, id, updatedState) => {
  return{
    ...obj,
    examiner: {
      ...obj.examiner,
      [id]: {
        ...obj.examiner[id],
        ...updatedState
      }
    }
  }
}

export const updateSimpleState = (obj, updatedState) => {
  return{
    ...obj,
    ...updatedState
  }
}

export const getSelectedOptions = (event) => {
  const optionsAsArray = [...event.target.options]
      .filter(({selected}) => selected)
      .map(({value}) => value);
  return optionsAsArray;
}

export const conditionalItemCheck = (arr, check) => {
  return !arr.includes(check);
}

export const checkDisabledFields = (examiner, value) => {
  for (let item in examiner){
    if(examiner[item].elementConfig){
      if(examiner[item].elementConfig.disabled === true || examiner[item].elementConfig.disabled === false){
        examiner[item].elementConfig.disabled = conditionalItemCheck(value, 'Speaking Examiner');
      }
    }
  }
  return examiner;
}

export const updateOptionArray = (options, event) => {
  if (event.target.checked) {
    options.push(event.target.id)
  }else{
    let index = options.indexOf(event.target.id)
    options.splice(index, 1)
  }
  return options;
}

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

export const generateObjectForSubmitForm = (obj) => {
    const data = {};

    for (let id in obj){
      data[id] = obj[id].value;
    }  

    return data;
}


export const updateDateArray = (arr, event, index) => {
  arr[index] = event.target.value;
  return arr;
} 

export const showHiddenFields = (obj) => {
  if(obj.roles.value.includes('Speaking Examiner')){
    return true;
  }else{
    return false;
  }
}


export const distributeValuesForEditing = (state, selected) => {  
  for(let item in state){
    state[item].value = selected[item];
    state[item].validation.valid = [];
  }

  if(state['roles'].value.includes('Speaking Examiner')){
    for(let item in state){
      state[item].elementConfig.disabled = false;
    }
  }

  return state; 
}

export const backToView = (history) => {
  history.push({
    pathname: '/'
  })
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
