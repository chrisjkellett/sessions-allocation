export const examinerCheck = (examiners, session) => {
    return examiners
      .filter(e => !e.roles.includes('Support staff'))
      // .filter(e => checkType(e, session.type.value))
      // .filter(e => checkLevels(e, session.levels.value))
      // .filter(e => checkDay(e, session.session_date.value, session.time.value))
      // .filter(e => checkOtherSessions(e, sessions))
  }