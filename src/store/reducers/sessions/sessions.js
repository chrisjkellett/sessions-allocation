import * as actionTypes from '../../actions/sessions/actionTypes';
import {
  objectToArray,
  sortBy,
  updateState,
  addId
} from '../utility';

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
      return { ...state, sessions: sortBy(objectToArray(action.sessions), 'session_date') };

    case actionTypes.ADD_SESSION_SUCCESS:
      sessions = state.sessions.concat(addId(action.session, action.id));
      return updateState(state, {sessions: sortBy(sessions, 'session_date'), error: false});
    
    case actionTypes.DELETE_SESSION_SUCCESS:
      return updateState(state, {sessions: action.sessions, error: false})

    case actionTypes.UPDATE_SESSION_SUCCESS:
      return { ...state, sessions: sortBy(state.sessions.filter(v => v.id !== action.id).concat(action.session), 'session_date') }

    case actionTypes.FETCH_SESSION:
      return { ...state, selectedSession: state.sessions.find(s => s.id === action.id ) }

    case actionTypes.DEACTIVATE_SELECTED_SESSION:
      return {...state, selectedSession: null}

    default:
      return state;  
  }
}

export default reducer;