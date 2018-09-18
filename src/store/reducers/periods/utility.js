import moment from 'moment';
import {CURRENTMONTH_AS_STRING} from '../../data';

export const monthsFromObject = ({...obj}) => {
  return Object.keys(obj)
    .map(item => moment(obj[item]['session_date'].join("-")).format('M'))
    .sort((a, b) => Number(a) > Number(b))
    .map(item => moment(item, 'M').format('MMMM'));
}

export const weeksFromObject = ({...obj}) => {
  return Object.keys(obj)
    .map(item => moment(obj[item]['session_date'].join("-")).format('W'))
    .sort((a, b) => Number(a) > Number(b))
    .map(item => moment().day('Monday').week(item).format("Do MMMM"));
}

export const monthsFromArray = (arr) => {
  return [
    ...arr.map(s => moment([...s.session_date].join("-")).format('M'))
    .sort((a, b) => Number(a) > Number(b))
    .map(s => moment(s, 'M').format('MMMM'))
 ]
}

export const weeksFromArray = (arr) => {
  return [
    ...arr.map(s => moment([...s.session_date].join("-")).format('W'))
    .sort((a, b) => Number(a) > Number(b))
    .map(s => moment(s, 'W').format('Do MMMM'))
 ]
}


export const setFromSessionPeriods = (array) => {
  const set = Array.from(new Set(array));
  return set.length > 0 ? set : null;
}

export const setCurrentPeriod = ([...periods]) => {
 if(periods.length === 0) return null;
 if(periods.length === 1) return periods[0];
 if(periods.length > 1){
   return calculateClosest(periods);
 }
}

export const calculateClosest = (periods) => {
  const weeks = periods.map(period => moment(period, 'Do MMMM').format('W'));
  const currentWeek = moment().week();
  const currentWeekAsString = moment().day('Monday').week(currentWeek).format("Do MMMM");
  return weeks.includes(currentWeek.toString()) ? currentWeekAsString : periods[0];
}

export const filterSessionsByWeek = (sessions, period) => {
  return sessions.filter(session => {
    return period === moment(session.session_date.join("-")).day('Monday').format('Do MMMM');
  })
}

export const filterSessionsByMonth = (sessions, period) => {
  return sessions.filter(session => {
    return period === moment(session.session_date.join("-")).format('MMMM')
  })
}

export const calculateCurrentPeriod = (periods) => {
  if(periods.includes(CURRENTMONTH_AS_STRING))
    return CURRENTMONTH_AS_STRING;
  else
   return periods[0];
}

// export const periodCheck = (period, sessions, periods, count, session) => {
//   if(sessions.includes(period) || count !== 1 || checkPeriodAgainstUpdatedSession(period, session)){
//     return period;
//   }

//   else{
//     return periods.filter(p => {
//       return p !== period
//     })[0]
//   }
// }

// export const checkPeriodAgainstUpdatedSession = (period, session) =>{
//   return moment([...session.session_date].join("-")).format('MMMM') === period;
// }

// export const checkPeriodExists = (period, session) => {
//   if(period){
//     console.log(period);
//     return period
//   }else
//     console.log(period);
//     return 'August';
// }