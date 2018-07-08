import moment from 'moment';

export const checkType = (examiner, sessionType) => {
  switch (sessionType){
    case 'Speaking':
      return examiner.roles.includes('Speaking Examiner');
    case 'Writing':
      return examiner.roles.includes('Supervisor');
    default:
      return true;  
  }
}

export const checkLevels = (examiner, sessionLevels) => {
  return sessionLevels.every(level => examiner.levels.includes(level));
}

export const checkDay = (examiner, sessionDayArray, sessionTime) => {
  const day = moment([...sessionDayArray].join("-")).format('dddd');
  const formattedDay = checkTime(day, sessionTime);
  return examiner.availability.includes(formattedDay);
}

const checkTime = (day, sessionTime) => {
  if(sessionTime.slice(0, 2) >= 14)
    return day + ' pm'
  else
    return day
}

