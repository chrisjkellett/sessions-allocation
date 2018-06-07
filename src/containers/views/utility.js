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

export const timeAgo = (arr) => {
  arr[1] = convertMonthToNumber(arr[1]);
  return moment(arr.join("-")).from();
}

const convertMonthToNumber = (month) => {
  const obj = monthOptions.find(item => {
    return item.m === month
  })

  return obj !== undefined ? obj.id : month;
}

export const formatLabel = (str) => {
  return str === undefined ? null : str.replace('_', ' ').toLowerCase();
}

export const renderTimeAgoClass = (arr) => {
  arr[1] = convertMonthToNumber(arr[1]);
  if(moment(arr.join("-")).from() < moment()){
    console.log('hello');
  }
  return 'Sub';
}
