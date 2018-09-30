import * as actionTypes from './actionTypes';

export const logResponse = (response, map) => {
  return {
    type: actionTypes.LOG_RESPONSE,
    response: response,
    map: map
  }
}

export const logError = (error, map) => {
  return {
    type: actionTypes.LOG_ERROR,
    errorMessage: error.response.data,
    map: map
  }
}

export const refreshLog = () => {
  return {
    type: actionTypes.REFRESH_LOG
  }
}