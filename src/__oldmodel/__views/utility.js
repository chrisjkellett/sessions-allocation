import React from 'react';
import moment from 'moment';
import classes from '../sessions/Sessions.css';
import {monthOptions} from '../../store/data';
import { sessionTableHeaders } from '../../store/app-data/table-headers';

export const isPm = (day) => {
  if(day.substring(day.length - 2, day.length) === 'pm'){
    return 'pm';
  }

  if(day.substring(day.length - 2, day.length) === 'am'){
    return 'am';
  }
}


export const convertToDate = (arr, format="Do MMMM YYYY") => {
  arr[1] = convertMonthToNumber(arr[1]);
  return moment(arr.join("-")).format(format);
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
  // if(moment(arr.join("-")).from() < moment()){
  //   console.log('hello');
  // }
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

export const generateTableHeaders = (weekFilteredBy) => {
  if(weekFilteredBy !== null){
    sessionTableHeaders[0] = (
      <span className={classes.SmallLabel}>
      {'from ' +
      moment(weekFilteredBy, 'Do MMMM').format('Do') +
      ' to ' +
      moment(weekFilteredBy, 'Do MMMM').add(6, 'days').format('Do MMMM')}
      </span>
    )
    return sessionTableHeaders
  }else{
    sessionTableHeaders[0] = 'date';
    return sessionTableHeaders;
  }
}