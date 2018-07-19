import moment from 'moment';

export const examinerCheck = ({examiners, session}) => {
    return examiners
      .filter(e => !e.roles.includes('Support staff'))
      // .filter(e => checkType(e, session.type.value))
      // .filter(e => checkLevels(e, session.levels.value))
      .map(e => checkDay(e, session.session_date.value, session.time.value))
      // .filter(e => checkOtherSessions(e, sessions))
  }

  export const checkDay = (examiner, sessionDayArray, sessionTime) => {
    const day = moment([...sessionDayArray].join("-")).format('dddd');
    const formattedDay = checkTime(day, sessionTime);
    const {availability, avail} = examiner;

     if (!availability.includes(formattedDay)){
      avail.available = false;
      avail.failsAvailability = true;
    }

    else{
      avail.available = true;
      avail.failsAvailability = false;
    }
    return examiner;
  }
  
  const checkTime = (day, sessionTime) => {
    if(sessionTime.slice(0, 2) >= 14)
      return day + ' pm'
    else
      return day
  }