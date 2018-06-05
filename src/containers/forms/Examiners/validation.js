import {monthOptions} from '../../../store/data';
import moment from 'moment';

//general validation setup
export const checkFormValidity = (obj) => {
  let isValid = true;

  for(let item in obj){
    if(obj[item].validation.valid.length !== 0){
      isValid = false
    }
  }

  return isValid;
}

export const checkValidity = (obj) => {
  const {validation, value} = obj;
  const {rules} = validation;

  let errors = [];

  if(rules.required && value.length === 0) errors.push(rules.required);

  if(rules.minLength && value.length < 6) errors.push(formatLengthError(rules.minLength, 6))

  if(rules.checkId && invalidID(value)) errors.push(rules.checkId)

  if(rules.checkDate && invalidDate([...value])) errors.push(rules.checkDate);

  if(rules.checkEmail && invalidEmail(value)) errors.push(rules.checkEmail);

  if(rules.beforeToday && NotBeforeToday([...value])) errors.push(rules.beforeToday);

  validation.valid = errors;
    
  return validation;
}

//tests for invalid values
const invalidID = (id) => {
  return !/[a-m][a-m][0-9][0-9][a-m][a-m]/i.test(id.trim())
}

const invalidEmail = (value) => {
  return !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
}

const invalidDate = (arr) => {
  arr[1] = convertMonthToNumber(arr[1]);
  arr[2] = checkZeros(arr[2]);
  return !moment(arr.join("-")).isValid();
}

const NotBeforeToday = (arr) => {
  arr[1] = convertMonthToNumber(arr[1]);
  arr[2] = checkZeros(arr[2]);
  return moment(arr.join("-"), 'YYYY-MM-DD').isAfter(moment());
}


//formatting functions
export const formatInput = (str, id) => {
  switch(id){
    case 'id_number':
      return str.toUpperCase();
    default:
      return str;
  }
}

const formatLengthError = (rule, num) => {
  return rule.replace(/#/g, num)
}

const convertMonthToNumber = (month) => {
  const obj = monthOptions.find(item => {
    return item.m === month
  })

  return obj.id;
}

const checkZeros = (day) => {
  return day.length === 1 ? '0' + day : day;
}
