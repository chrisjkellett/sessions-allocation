import moment from 'moment';
import {convertMonthToNumber, checkZeros} from './utility';

export const invalidID = (id) => {
  return !/[a-m][a-m][0-9][0-9][a-m][a-m]/i.test(id.trim())
}

export const invalidEmail = (value) => {
  return !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
}

export const invalidDate = (arr) => {
  arr[1] = convertMonthToNumber(arr[1]);
  arr[2] = checkZeros(arr[2]);
  return !moment(arr.join("-")).isValid();
}

export const NotBeforeToday = (arr) => {
  arr[1] = convertMonthToNumber(arr[1]);
  arr[2] = checkZeros(arr[2]);
  return moment(arr.join("-"), 'YYYY-MM-DD').isAfter(moment());
}