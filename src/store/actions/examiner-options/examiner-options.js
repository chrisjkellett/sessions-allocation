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

export const selectAvailableExaminers = (examiner) => {
  return {
    type: actionTypes.SELECT_EXAMINER,
    examiner: examiner,
  }
};

export const clearSelectedExaminers = () => {
  return {
    type: actionTypes.CLEAR_SELECTED_EXAMINERS,
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