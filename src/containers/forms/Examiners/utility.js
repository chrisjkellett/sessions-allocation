
import {monthOptions} from '../../../store/data';
import moment from 'moment';

export const updateState = (obj, id, updatedState) => {
  return{
    ...obj,
    examiner: {
      ...obj.examiner,
      [id]: {
        ...obj.examiner[id],
        ...updatedState, 
        valid: checkValidity(updatedState.value, {...obj.examiner[id].validation})
      }
    }
  }
}

export const checkValidity = (value, validation) => {
  let isValid = true;

  if(validation && validation.required && isValid){
    isValid = value.trim() !== '' && isValid;
  }

  if(validation && validation.idCheck && isValid){
    isValid = /[a-m][a-m][0-9][0-9][a-m][a-m]/i.test(value);
  }

  if(validation.date && isValid){
    const dateCopy = [...value];
    dateCopy[1] = convertMonthToNumber(dateCopy[1]);
    isValid = moment(dateCopy.join("-")).isValid();
  }

  if(validation.beforeNow && isValid){
    const dateCopy = [...value];
    dateCopy[1] = convertMonthToNumber(dateCopy[1]);
    console.log(moment().format('UTC'));
    console.log('checking if before now');
  }

  return isValid;  
}

export const convertMonthToNumber = (month) => {
  const obj = monthOptions.find(item => {
    return item.m === month;
  })

  return obj.id;
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

