export const generateInputProps = (element, periodHandler, props, sessions) => {
  const {config} = element;
  const {currentPeriod, periods} = props;
  return {
    key: element.id,
    label: element.id,
    sessionCount: sessions.length,
    options: periods,
    elementtype: config.period.elementType,
    elementConfig: config.period.elementConfig,
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