import moment from 'moment';
import {isSameTime} from './utility';

export const type = (examiner, sessionType) => {
  const writingRoles = examiner.roles.includes('Supervisor') || examiner.roles.includes('Invigilator')
  if(sessionType === 'Writing'){
    if(!writingRoles)
      examiner.avail.failsRoles = true;
    else{
      examiner.avail.failsRoles = false;
    }
  }
  if(sessionType === 'Speaking'){
    if(!examiner.roles.includes('Speaking Examiner')){
      examiner.avail.failsRoles = true;
    }else{
      examiner.avail.failsRoles = false;
    }
  }
  return examiner;
}

export const levels = (examiner, sessionLevels, sessionType) => {
  const {levels, avail} = examiner;
  if(examiner.levels && sessionLevels.length !== 0 && sessionType === 'Speaking'){
    if(!sessionLevels.every(level => levels.includes(level)))
      avail.failsLevel = true;
  }

  else
    avail.failsLevel = false;

  return examiner;
}


export const day = (examiner, sessionDayArray, sessionTime) => {
  const day = moment([...sessionDayArray].join("-")).format('dddd');
  const formattedDay = time(day, sessionTime);
  const {availability, avail} = examiner;

   if (!availability.includes(formattedDay))
    avail.failsAvailability = true;
  else
    avail.failsAvailability = false;

  return examiner;
}

const time = (day, sessionTime) => {
  if(sessionTime.slice(0, 2) >= 14)
    return day + ' pm'
  else
    return day
}

export const isBusy = (e, sameDaySessions, time) => {
  if (sameDaySessions.length !== 0){
    sameDaySessions.forEach(s => {
      if(isSameTime(s.time, time))
        if((s.examiners && s.examiners.find(ex => ex.name === e.name)) || (s.support && s.support.find(ex => ex.name === e.name))) 
          e.avail.failsIsBusy = true;
        else  
          e.avail.failsIsBusy = e.avail.failsIsBusy ? true : false;

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

const clone = src => Object.assign({}, src);

export const isSupportAlso = (e, sessionSupport) => {
  const availCopy = clone(e.avail);
  if(sessionSupport.includes(e.name)){
    availCopy.failsIsSupport = true;
  }else
    availCopy.failsIsSupport = false;
  return {...e, avail: {...availCopy}};
}

export const isExaminerAlso = (e, sessionExaminers) => {
  const availCopy = clone(e.avail);
  if(sessionExaminers.includes(e.name)){
    availCopy.failsIsExaminer = true;
  }else
    availCopy.failsIsExaminer = false;
  return {...e, avail: {...availCopy}};
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
