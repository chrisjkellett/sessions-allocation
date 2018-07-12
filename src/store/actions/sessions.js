import * as actionTypes from './actionTypes';
import axios from '../../axios';
import {logResponse} from './general';
import {loadPeriods} from './periods';

export const loadSessions = () => {
  return dispatch => {
    axios.get('/sessions.json')
      .then(response => {
        dispatch(loadSessionsSuccess(response.data));
        dispatch(loadPeriods(response.data));
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

export const addSession = (sessions, session) => {
  return dispatch => {
    axios.post('/sessions.json', session)
      .then(response => {
        dispatch(addSessionSuccess(session, response.data.name));
        dispatch(logResponse(session, {type: 'session', action: 'added'}));
      })
      .catch(error => {
        dispatch(failedLoad(error));
      })
  }
}

export const addSessionSuccess = (session, id) => {
  return {
    type: actionTypes.ADD_SESSION_SUCCESS,
    session: session,
    id: id
  }
}

export const deleteSession = (sessions, session) => {
  return dispatch => {
    axios.delete('/sessions/' + session.id + '.json')
      .then(() => {
        dispatch(deleteSessionSuccess(sessions));
        dispatch(logResponse(session, {type: 'session', action: 'deleted'}));
      })
      .catch(error => {
        dispatch(failedLoad(error))
      })
  }
}

export const deleteSessionSuccess = (sessions) => {
  return {
    type: actionTypes.DELETE_SESSION_SUCCESS,
    sessions: sessions
  }
}

export const updateSession = (sessions, session, id) => {
  return dispatch => {
    axios.put('/sessions/' + id + '.json', session)
      .then(() => {
        dispatch(updateSessionSuccess(sessions));
        dispatch(logResponse(session, {type: 'session', action: 'updated'}))
      })
      .catch(error => {
        dispatch(failedLoad(error))
      })
  }
}

export const updateSessionSuccess = (sessions) => {
  return {
    type: actionTypes.UPDATE_SESSION_SUCCESS,
    sessions: sessions
  }
}

export const fetchSession = (session) => {
  return {
    type: actionTypes.FETCH_SESSION,
    session: session
  }
}

export const deActivateSelectedSession = () => {
  return {
    type: actionTypes.DEACTIVATE_SELECTED_SESSION
  }
}

export const filterSessions = (period, sessions) => {
  return {
    type: actionTypes.FILTER_SESSIONS,
    period: period
  }
}

