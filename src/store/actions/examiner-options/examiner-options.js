import * as actionTypes from './actionTypes';

export const calculateAvailableExaminers = (examiners, session, sessions, sessionId) => {
  return {
    type: actionTypes.CALCULATE_AVAILABLE_EXAMINERS,
    examiners: examiners,
    session: session,
    sessions: sessions,
    sessionId: sessionId
  }
}

export const calculateSameDaySessions = (sessions, sessionDate) => {
  return {
    type: actionTypes.CALCULATE_SAME_DAY_SESSIONS,
    sessions: sessions,
    sessionDate: sessionDate
  }
}

export const filterExaminers = (examiners, filterValue) => {
  return {
    type: actionTypes.FILTER_EXAMINERS,
    examiners: examiners,
    filterValue: filterValue
  }
}

export const filterSupport = (support, filterValue) => {
  return {
    type: actionTypes.FILTER_SUPPORT,
    support: support,
    filterValue: filterValue
  }
}