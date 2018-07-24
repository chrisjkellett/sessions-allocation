import moment from 'moment';
import {isSameTime} from './utility';

export const levels = (examiner, sessionLevels) => {
  const {levels, avail} = examiner;
  if(examiner.levels && sessionLevels.length !== 0){
    if(!sessionLevels.every(level => levels.includes(level))){
      avail.failsLevel = true;
    }
  }

  else{
    avail.failsLevel = false;
  }

  return examiner;
}


export const day = (examiner, sessionDayArray, sessionTime) => {
  const day = moment([...sessionDayArray].join("-")).format('dddd');
  const formattedDay = time(day, sessionTime);
  const {availability, avail} = examiner;

   if (!availability.includes(formattedDay)){
    avail.failsAvailability = true;
  }

  else{
    avail.failsAvailability = false;
  }
  return examiner;
}

const time = (day, sessionTime) => {
  if(sessionTime.slice(0, 2) >= 14)
    return day + ' pm'
  else
    return day
}

export const type = (examiner, sessionType) => {
  if(sessionType === 'Writing'){
    if(!(examiner.roles.includes('Invigilator') || examiner.roles.includes('Supervisor'))){
      examiner.avail.failsRoles = true;
    }
  }
  if(sessionType === 'Speaking'){
    if(!examiner.roles.includes('Speaking Examiner')){
      examiner.avail.failsRoles = true;
    }
  }
  else{
    examiner.avail.failsRoles = false;
  }

  return examiner;
}

export const isBusy = (e, sameDaySessions, time) => {
  if (sameDaySessions.length !== 0){
    sameDaySessions.forEach(s => {
      if(isSameTime(s.time, time))
        if(s.examiners.includes(e.name)) e.avail.failsIsBusy = true;

      else
        e.avail.failsIsBusy = false;
    })
    return e;
  }

  else{
    e.avail.failsIsBusy = false;
    return e;
  }
}

//always final check
export const isAvailable = (e) => {
  if(!Object.keys(e.avail).every(item => !e.avail[item])){
    e.available = false;
  }
  else{
    e.available = true;
  }
  return e;
}
