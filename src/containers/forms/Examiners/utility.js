export const capsFirstLetters = (str) => {
  return str.replace(/\b\w/g, l => l.toUpperCase());
}

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

export const getSelectedOptions = (event) => {
  return [...event.target.options]
      .filter(({selected}) => selected)
      .map(({value}) => value);
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

export const validationHandler = (validation, id) => {
  if(validation !== null){
    return validation.find(errorObj => {
      return errorObj.id === id.toLowerCase()
    })
  }else{
    return null;
  }
}

export const checkValidity = (state) => {
  let isValid = [];
  const errors = {
    required: 'compulsory field'
  }

  if(state.name.trim().length === 0)
    isValid.push({id: 'name', error: errors.required})

  if(state.availability.length === 0)
    isValid.push({id: 'availability', error: errors.required})
  
  if(state.roles.length === 0)
    isValid.push({id: 'roles', error: errors.required})
  
  return isValid;  
}