import * as actionTypes from './actionTypes';
import axios from '../../../axios';
import { logResponse, logError } from '../general/general';
import { loadPeriods, updatePeriods } from '../periods/periods';

export const loadSessions = () => {
  return dispatch => {
    axios.get('/sessions.json')
      .then(response => {
        // const currentSessions = filterOutOldSessions(response.data);
        dispatch(loadSessionsSuccess(response.data));
        response.data && dispatch(loadPeriods(response.data));
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export const loadSessionsSuccess = (data) => {
  return {
    type: actionTypes.LOAD_SESSIONS_SUCCESS,
    sessions: data
  }
};

export const addSession = (sessions, session, token) => {
  return dispatch => {
    axios.post('/sessions.json?auth=' + token, session)
      .then(response => {
        dispatch(addSessionSuccess(session, response.data.name));
        dispatch(logResponse(session, {type: 'session', action: 'added'}));
        dispatch(updatePeriods(sessions.concat({...session})));
      })
      .catch(error => {
        dispatch(logError(error, {type: 'session', action: 'added'}));
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

export const deleteSession = (sessions, session, token) => {
  return dispatch => {
    axios.delete('/sessions/' + session.id + '.json?auth=' + token)
      .then(() => {
        const filtered = sessions.filter(s => s.id !== session.id);
        dispatch(deleteSessionSuccess(filtered));
        dispatch(logResponse(session, {type: 'session', action: 'deleted'}));
        dispatch(updatePeriods(filtered));
      })
      .catch(error => {
        dispatch(logError(error, {type: 'session', action: 'delete'}));
      })
  }
}

export const deleteSessionSuccess = (sessions) => {
  return {
    type: actionTypes.DELETE_SESSION_SUCCESS,
    sessions: sessions
  }
}

export const updateSession = (sessions, session, id, token) => {
  return dispatch => {
    axios.put('/sessions/' + id + '.json?auth=' + token, session)
      .then(() => {
        const updated = sessions.filter(s => s.id !== id).concat({...session, id: id});
        dispatch(updateSessionSuccess(updated));
        dispatch(logResponse(session, {type: 'session', action: 'updated'}));
        dispatch(updatePeriods(updated));
      })
      .catch(error => {
        dispatch(logError(error, {type: 'session', action: 'update'}));
      })
  }
}

export const updateSessionSuccess = (sessions) => {
  return {
    type: actionTypes.UPDATE_SESSION_SUCCESS,
    sessions: sessions
  }
}

export const fetchSession = (id) => {
  return {
    type: actionTypes.FETCH_SESSION,
    id: id
  }
}

export const clearSelectedSession = () => {
  return {
    type: actionTypes.CLEAR_SELECTED_SESSION
  }
}

export const filterSessions = (period, sessions) => {
  return {
    type: actionTypes.FILTER_SESSIONS,
    period: period
  }
}

export const filterSessionsByHeader = (value, filterBy) => {
  return {
    type: actionTypes.FILTER_SESSIONS_BY_HEADER,
    value: value,
    filterBy: filterBy,
  }
}

