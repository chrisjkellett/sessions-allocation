import moment from 'moment';

export const formatURL = (str) => {
  return str.toLowerCase().replace(" ", "");
}

export const formatDateURL = (arr) => {
  delete arr[0];
  return arr.join("");
}

export const formatDateURLPretty = (arr) => {
  return moment(arr.join("-")).format('MMMMD').toLowerCase();
}