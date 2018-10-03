import * as actionTypes from '../../actions/sessions/actionTypes';
import {
  objectToArray,
  sortBy,
  filterData,
} from '../utility';

const initialState = {
  sessions: null,
  error: false,
  editing: false,
  selectedSession: null,
  filteredSessions: null
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.LOAD_SESSIONS_SUCCESS:
      return { ...state, sessions: sortBy(objectToArray(action.sessions), 'session_date') };

    case actionTypes.ADD_SESSION_SUCCESS:
      const session = { ...action.session, id: action.id} 
      return { ...state, sessions: sortBy(state.sessions.concat(session), 'session_date')}

    case actionTypes.DELETE_SESSION_SUCCESS:
      return { ...state, sessions: action.sessions}

    case actionTypes.UPDATE_SESSION_SUCCESS:
      return { ...state, sessions: sortBy(state.sessions.filter(v => v.id !== action.id).concat(action.session), 'session_date') }

    case actionTypes.FETCH_SESSION:
      return { ...state, selectedSession: state.sessions.find(s => s.id === action.id ) }

    case actionTypes.DEACTIVATE_SELECTED_SESSION:
      return {...state, selectedSession: null}

    case actionTypes.FILTER_SESSIONS_BY_HEADER:
      return { ...state, filteredSessions: filterData(state.sessions, action)}

    default:
      return state;  
  }
}

export default reducer;