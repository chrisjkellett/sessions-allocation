import * as actionTypes from './actionTypes';

export const calculateAvailableExaminers = (examiners, session) => {
  return {
    type: actionTypes.CALCULATE_AVAILABLE_EXAMINERS,
    examiners: examiners,
    session: session
  }
}