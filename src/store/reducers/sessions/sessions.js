import * as actionTypes from '../../actions/sessions/actionTypes';
import {
  objectToArray,
  sortBy
} from '../utility';

const initialState = {
  sessions: null,
  error: false,
  editing: false,
  selectedSession: null
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.LOAD_SESSIONS_SUCCESS:
      return { ...state, sessions: sortBy(objectToArray(action.sessions), 'session_date') };

    // case actionTypes.ADD_SESSION_SUCCESS:
    //   sessions = state.sessions.concat(addId(action.session, action.id));
    //   return updateState(state, {sessions: sortBy(sessions, 'session_date'), error: false});
    
    // case actionTypes.DELETE_SESSION_SUCCESS:
    //   return updateState(state, {sessions: action.sessions, error: false})

    // case actionTypes.UPDATE_SESSION_SUCCESS:
    //   return updateState(state, {sessions: sortBy(action.sessions, 'session_date'), error: false})

    // case actionTypes.FAILED_LOAD:
    //   return updateState(state, {error: action.error})

    // case actionTypes.FETCH_SESSION:
    //   return updateState(state, {selectedSession: action.session})

    // case actionTypes.DEACTIVATE_SELECTED_SESSION:
    //   return updateState(state, {selectedSession: null})

    default:
      return state;  
  }
}

export default reducer;