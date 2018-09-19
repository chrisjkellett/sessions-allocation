import moment from 'moment';
import {CURRENTMONTH_AS_STRING} from '../../data';

export const weeksFromObject = ({...obj}) => {
  return Object.keys(obj)
    .map(item => moment(obj[item]['session_date'].join("-")).format('W'))
    .sort((a, b) => Number(a) > Number(b))
    .map(item => moment().day('Monday').week(item).format("Do MMMM"));
};

export const weeksFromArray = (arr) => {
  return [
    ...arr.map(s => moment([...s.session_date].join("-")).format('W'))
    .sort((a, b) => Number(a) > Number(b))
    .map(s => moment(s, 'W').format('Do MMMM'))
 ]
};

export const setCurrentPeriodByWeek = ([...periods]) => {
  if(periods.length === 0) return null;
  if(periods.length === 1) return periods[0];
  if(periods.length > 1){
    return calculateClosestWeek(periods);
  }
 };

 export const calculateClosestWeek = (periods) => {
  const weeks = periods.map(period => moment(period, 'Do MMMM').format('W'));
  const currentWeek = moment().week();
  const currentWeekAsString = moment().day('Monday').week(currentWeek).format("Do MMMM");
  return weeks.includes(currentWeek.toString()) ? currentWeekAsString : periods[0];
};

export const filterSessionsByWeek = (sessions, period) => {
  return sessions.filter(session => {
    return period === moment(session.session_date.join("-")).day('Monday').format('Do MMMM');
  })
};

export const monthsFromObject = ({...obj}) => {
  return Object.keys(obj)
    .map(item => moment(obj[item]['session_date'].join("-")).format('M'))
    .sort((a, b) => Number(a) > Number(b))
    .map(item => moment(item, 'M').format('MMMM'));
};

export const monthsFromArray = (arr) => {
  return [
    ...arr.map(s => moment([...s.session_date].join("-")).format('M'))
    .sort((a, b) => Number(a) > Number(b))
    .map(s => moment(s, 'M').format('MMMM'))
 ]
};

export const setCurrentPeriodByMonth = ([...periods]) => {
  if(periods.length === 0) return null;
  if(periods.length === 1) return periods[0];
  if(periods.length > 1){
    return calculateClosestMonth(periods);
  }
 };

 export const calculateClosestMonth = (periods) => {
  if(periods.includes(CURRENTMONTH_AS_STRING))
    return CURRENTMONTH_AS_STRING;
  else
   return periods[0];
};
 

export const filterSessionsByMonth = (sessions, period) => {
  return sessions.filter(session => {
    return period === moment(session.session_date.join("-")).format('MMMM')
  })
};

export const setFromSessionPeriods = (array) => {
  const set = Array.from(new Set(array));
  return set.length > 0 ? set : null;
};




