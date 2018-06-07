
// import {monthOptions} from '../../../store/data';
// import moment from 'moment';

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

    data.availability = formatAvailability([...data.availability]);
    

    return data;
}

const formatAvailability = (arr) => {
  let newArr = [];
  const allpms = arr.filter(day =>{
    return day.substring(day.length -2, day.length) === 'pm'
  }).map(day=>{
    return day.substring(0, day.length - 3)
  });

  const allams = arr.filter(day =>{
    return day.substring(day.length -2, day.length) !== 'pm'
  });


  for(let item of arr){
    if(allpms.includes(item) && allams.includes(item)){
      newArr.push(item);
    }

    else if(!allpms.includes(item) && allams.includes(item)){
      newArr.push(item + ' am');
    }

    else if(allpms.includes(item.substring(0, item.length - 3)) && !allams.includes(item.substring(0, item.length - 3))){
      newArr.push(item);
    }
  }

  return newArr;
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

export const generateGroups = (obj) => {
  let groups = [];

  for (let item in obj){
    groups.push(obj[item].group)
  }

  return Array.from(new Set(groups));
}

export const generateGroupClasses = (classes, group, active) => {
  if(group !== active) return classes.Group;
  else return classes.NotActiveGroup;
}

export const distributeValuesForEditing = (state, selected) => {   
  for(let item in state){
    state[item].value = selected[item];
    state[item].validation.valid = [];
  }
  return state; 
}

export const backToView = (history) => {
  history.push({
    pathname: '/'
  })
}
