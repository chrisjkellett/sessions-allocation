import * as actionTypes from './actionTypes';
import axios from '../../axios';
import {logResponse} from './general';

export const loadSessions = () => {
  return dispatch => {
    axios.get('/sessions.json')
      .then(response => {
        dispatch(loadSessionsSuccess(response.data))
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

export const loadPeriods = (sessions) => {
  return {
    type: actionTypes.LOAD_PERIODS,
    sessions: sessions
  }
}


export const updatePeriods = () => {
  return {
    type: actionTypes.UPDATE_PERIODS
  }
}

export const failedLoad = (error) => {
  return {
    type: actionTypes.FAILED_LOAD,
    error: error
  }
} 

export const addSession = (session) => {
  return dispatch => {
    axios.post('/sessions.json', session)
      .then(response => {
        dispatch(addSessionSuccess(session, response.data.name))
        dispatch(updatePeriods())
        dispatch(logResponse(session, {type: 'session', action: 'add'}))
      })
      .catch(error => {
        dispatch(failedLoad(error))
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

export const deleteSession = (session, sessionCount) => {
  return dispatch => {
    axios.delete('/sessions/' + session.id + '.json')
      .then(response => {
        dispatch(deleteSessionSuccess(session.id, sessionCount))
        dispatch(updatePeriods())
        dispatch(logResponse(session, {type: 'session', action: 'delete'}))
      })
      .catch(error => {
        dispatch(failedLoad(error))
      })
  }
}

export const deleteSessionSuccess = (id, sessionCount) => {
  return {
    type: actionTypes.DELETE_SESSION_SUCCESS,
    id: id,
    sessionCount: sessionCount
  }
}

export const updateSession = (session, id, counter) => {
  return dispatch => {
    axios.put('/sessions/' + id + '.json', session)
      .then(() => {
        dispatch(updateSessionSuccess(session, id, counter))
        dispatch(updatePeriods())
        dispatch(logResponse(session, {type: 'session', action: 'update'}))
      })
      .catch(error => {
        dispatch(failedLoad(error))
      })
  }
}

export const updateSessionSuccess = (session, id, counter) => {
  return {
    type: actionTypes.UPDATE_SESSION_SUCCESS,
    session: session,
    id: id,
    counter: counter
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

export const setPeriod = period => {
  return {
    type: actionTypes.SET_PERIOD,
    period: period
  }
}
