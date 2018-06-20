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

export const addSession = (session) => {
  return dispatch => {
    axios.post('/sessions.jsoN', session)
      .then(response => {
        dispatch(addSessionSuccess(session, response.data.name))
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

export const deleteSession = (id) => {
  return dispatch => {
    axios.delete('/sessions/' + id + '.json')
      .then(response => {
        dispatch(deleteSessionSuccess(id))
      })
      .catch(error => {
        dispatch(failedLoad(error))
      })
  }
}

export const deleteSessionSuccess = (id) => {
  return {
    type: actionTypes.DELETE_SESSION_SUCCESS,
    id: id
  }
}

export const updateSession = (session, id) => {
  return dispatch => {
    axios.put('/sessions/' + id + '.json', session)
      .then(response => {
        dispatch(updateSessionSuccess(session, id))
      })
      .catch(error => {
        dispatch(failedLoad(error))
      })
  }
}

export const updateSessionSuccess = (session, id) => {
  return {
    type: actionTypes.UPDATE_SESSION_SUCCESS,
    session: session,
    id: id
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