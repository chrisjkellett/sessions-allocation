import moment from 'moment';

export const invalidID = (value) => {
  return value !== '' && !/[a-m][a-m][0-9][0-9][a-m][a-m]/i.test(value.trim())
}

export const invalidEmail = (value) => {
  return !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
}

export const invalidDate = (arr) => {
  return !moment(arr.join("-"), 'YYYY-MM-DD').isValid();
}

export const NotBeforeToday = (arr) => {
  return moment(arr.join("-"), 'YYYY-MM-DD').isBefore(moment().subtract(1, 'days'));
}

export const notYLE = (levels) => {
  return !levels.value.some(level => level === 'YLE');
}