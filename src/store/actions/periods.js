import * as actionTypes from './actionTypes';

export const loadPeriods = (sessions) => {
  return {
    type: actionTypes.LOAD_PERIODS,
    sessions: sessions
  }
}

export const updatePeriods = (sessions) => {
  return {
    type: actionTypes.UPDATE_PERIODS,
    sessions: sessions
  }
}

export const handlePeriodSelect = (sessions, period) => {
  return {
    type: actionTypes.HANDLE_PERIOD_SELECT,
    sessions: sessions,
    period: period
  }
}