import * as actionTypes from './actionTypes';

export const logResponse = response => {
  return {
    type: actionTypes.LOG_RESPONSE,
    response: response
  }
}

export const refreshLog = () => {
  return {
    type: actionTypes.REFRESH_LOG
  }
}