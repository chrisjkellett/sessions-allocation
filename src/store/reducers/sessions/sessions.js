import * as actionTypes from '../../actions/sessions/actionTypes';
import {
  objectToArray,
  sortBy,
  filterData,
} from '../utility';

const initialState = {
  sessions: null,
  archived: null,
  error: false,
  editing: false,
  selectedSession: null,
  filteredSessions: null,
  filterValue: '',
  formActive: false,
  showArchived: false,
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.LOAD_SESSIONS_SUCCESS:
      return { 
        ...state, 
        sessions: Object.keys(action.sessions).length === 0 ? [] : sortBy(objectToArray(action.sessions), 'session_date'),
        archived: Object.keys(action.archived).length === 0 ? [] : sortBy(objectToArray(action.archived), 'session_date')
      };

    case actionTypes.ADD_SESSION_SUCCESS:
      const session = { ...action.session, id: action.id} 
      return { ...state, sessions: sortBy(state.sessions.concat(session), 'session_date')}

    case actionTypes.DELETE_SESSION_SUCCESS:
      return { ...state, sessions: action.sessions}

    case actionTypes.UPDATE_SESSION_SUCCESS:
      return { ...state, sessions: sortBy(action.sessions, 'session_date') }

    case actionTypes.FETCH_SESSION:
      return { ...state, selectedSession: action.id ? state.archived.find(s => s.id === action.id ) : null, formActive: true }

    case actionTypes.CLEAR_SELECTED_SESSION:
      return {...state, selectedSession: null, formActive: false }

    case actionTypes.FILTER_SESSIONS_BY_HEADER:
      return { ...state, filteredSessions: filterData(state.sessions, action), filterValue: action.value}

    case actionTypes.CLEAR_FILTERS:
      return { ...state, filteredSessions: null }

    case actionTypes.TOGGLE_ARCHIVE:
      return { ...state, showArchived: state.showArchived ? false : true }

    default:
      return state;  
  }
}

export default reducer;