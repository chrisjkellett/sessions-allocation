import * as check from './checks';

export const examinerCheck = ({examiners, session}) => {
    return examiners
      .filter(e => !e.roles.includes('Support staff'))
      .map(e => check.type(e, session.type.value))
      .map(e => check.levels(e, session.levels.value))
      .map(e => check.day(e, session.session_date.value, session.time.value))
      // .filter(e => checkOtherSessions(e, sessions))
      .map(e => check.isAvailable(e))
  }

