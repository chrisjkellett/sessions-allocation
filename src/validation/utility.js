import {monthOptions} from '../store/data';

export const formatInput = (str, id) => {
  switch(id){
    case 'id_number':
      return str.toUpperCase();
    default:
      return str;
  }
}

export const formatLengthError = (rule, num) => {
  return rule.replace(/#/g, num)
}

export const convertMonthToNumber = (month) => {
  const obj = monthOptions.find(item => {
    return item.m === month
  })

  return obj.id;
}

export const checkZeros = (day) => {
  return day.length === 1 ? '0' + day : day;
}
