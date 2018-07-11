import * as actionTypes from './actionTypes';

export const loadPeriods = (sessions) => {
  return {
    type: actionTypes.LOAD_PERIODS,
    sessions: sessions
  }
}