// import {monthOptions} from '../../store/data';

export const updateState = (obj, id, updatedState, type) => {
  return{
    ...obj,
    [type]: {
      ...obj[type],
      [id]: {
        ...obj[type][id],
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
  if(event.target.multiple){
    const optionsAsArray = [...event.target.options]
        .filter(({selected}) => selected)
        .map(({value}) => value);
    return optionsAsArray;
  }

  else
    return event.target.value;
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
    options.push(event.target.id);
  }else{
    let index = options.indexOf(event.target.id);
    options.splice(index, 1)
  }
  return Array.from(new Set(options));
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

export const backToView = (history, route) => {
  history.push({
    pathname: route
  })
}

export const checkFormValidity = (obj) => {
  let isValid = true;

  for(let item in obj){
    if(obj[item].validation.valid.length !== 0 && !obj[item].elementConfig.disabled){
      isValid = false
    }
  }

  return isValid;
}

// export const momentReadyArr = (Arr) => {
//   const arr = [...Arr];
//   arr[1] = convertMonthToNumber(arr[1]);
//   arr[2] = checkZeros(arr[2]);
//   return arr.join("-");
// }


// export const convertMonthToNumber = (month) => {
//   const obj = monthOptions.find(item => {
//     return item.m === month
//   })

//   return obj.id;
// }

// export const checkZeros = (day) => {
//   return day.length === 1 ? '0' + day : day;
// }

export const distributeValuesForEditing = (state, selected) => {  
  for(let item in state){
    state[item].value = selected[item];
    state[item].validation.valid = [];
  }

  if(state.roles){
    if(state['roles'].value.includes('Speaking Examiner')){
      for(let item in state){
        state[item].elementConfig.disabled = false;
      }
    }
  }

  return state; 
}