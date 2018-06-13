import * as actionTypes from './actionTypes';
import axios from '../../axios';
import {objectToArray} from './utility';

export const loadSessions = () => {
  return dispatch => {
    axios.get('/sessions.json')
      .then(response => {
        dispatch(loadSessionsSuccess(objectToArray(response.data)))
      })
      .catch(error => {
        dispatch(failedLoad(error))
      })
  }
}

export const loadSessionsSuccess = (data) => {
  return {
    type: actionTypes.LOAD_SESSIONS_SUCCESS,
    sessions: data
  }
}

export const failedLoad = (error) => {
  return {
    type: actionTypes.FAILED_LOAD,
    error: error
  }
} 
