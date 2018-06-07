import moment from 'moment';
import {monthOptions} from '../../store/data';

export const examinerTableHeaders = [
  'examiner name',
  'roles',
  'levels',
  'availability',
  null
]

export const isPm = (day) => {
  if(day.substring(day.length - 2, day.length) === 'pm'){
    return 'pm';
  }

  if(day.substring(day.length - 2, day.length) === 'am'){
    return 'am';
  }
}


export const formatURL = (str) => {
  return str.toLowerCase().replace(" ", "");
}

export const convertToDate = (arr) => {
  arr[1] = convertMonthToNumber(arr[1]);
  return moment(arr.join("-")).format("Do MMMM YYYY");
}

const convertMonthToNumber = (month) => {
  const obj = monthOptions.find(item => {
    return item.m === month
  })

  return obj.id;
}

