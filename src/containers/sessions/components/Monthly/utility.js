export const generateInputProps = (element, periodHandler, props, sessions) => {
  const {config} = element;
  const {currentPeriod, periods} = props;
  return {
    key: element.id,
    label: element.id,
    sessionCount: sessions.length,
    options: periods,
    elementtype: config.elementType,
    elementConfig: config.elementConfig,
    value: currentPeriod,
    valid: [],
    change: (event) => periodHandler(event, element.id)
  }
}

export const filterByUser = (sessions, isAuthenticated, user) => {
  if(isAuthenticated)
    return sessions;
  else  
    return sessions.filter(sess => sess.examiners.includes(user) || sess.support.includes(user));
}

export const WeeklyOrMonthly = (sessionsByPeriod, sessionsByWeek) => {
  return sessionsByWeek.length === 0 ? sessionsByPeriod : sessionsByWeek
}