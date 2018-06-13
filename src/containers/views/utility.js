import moment from 'moment';
import {monthOptions} from '../../store/data';

export const isPm = (day) => {
  if(day.substring(day.length - 2, day.length) === 'pm'){
    return 'pm';
  }

  if(day.substring(day.length - 2, day.length) === 'am'){
    return 'am';
  }
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

export const formatAvailability = (arr) => {
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