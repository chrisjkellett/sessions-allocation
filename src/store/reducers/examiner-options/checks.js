import moment from 'moment';

export const levels = (examiner, sessionLevels) => {
  const {levels, avail} = examiner;
  if(!sessionLevels.every(level => levels.includes(level))){
    avail.failsLevel = true;
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
  else{
    examiner.avail.failsRoles = false;
  }

  return examiner;
}

//always final check
export const isAvailable = (e) => {
  if(!Object.keys(e.avail).every(item => !e.avail[item])){
    e.available = false;
  }
  return e;
}
