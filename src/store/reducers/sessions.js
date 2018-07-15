import * as actionTypes from '../actions/actionTypes';
import {
  updateState,
  addId,
  objectToArray,
  sortBy
} from './utility';

const initialState = {
  sessions: null,
  error: false,
  editing: false,
  selectedSession: null
}

let sessions;

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.LOAD_SESSIONS_SUCCESS:
      sessions = action.sessions !== null ? objectToArray(action.sessions, 'session_date'): [];
      return updateState(state, {sessions: sessions, error: false});

    case actionTypes.ADD_SESSION_SUCCESS:
      sessions = state.sessions.concat(addId(action.session, action.id));
      return updateState(state, {sessions: sortBy(sessions, 'session_date'), error: false});
    
    case actionTypes.DELETE_SESSION_SUCCESS:
      return updateState(state, {sessions: action.sessions, error: false})

    case actionTypes.UPDATE_SESSION_SUCCESS:
      return updateState(state, {sessions: sortBy(action.sessions, 'session_date'), error: false})

    case actionTypes.FAILED_LOAD:
      return updateState(state, {error: action.error})

    case actionTypes.FETCH_SESSION:
      return updateState(state, {selectedSession: action.session})

    case actionTypes.DEACTIVATE_SELECTED_SESSION:
      return updateState(state, {selectedSession: null})

    default:
      return state;  
  }
}

export default reducer;