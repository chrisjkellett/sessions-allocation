import * as actionTypes from '../actions/actionTypes';
import {
  updateState,
  addId,
  removeElementById,
  replaceElementById,
  objectToArray,
  objectToSessionPeriods,
  sortBy,
  filterSessionsByMonth
} from './utility';

const initialState = {
  sessions: null,
  allSessions: null,
  error: false,
  editing: false,
  selectedSession: null,
  periods: null,
  period: null
}

let sessions, periods;

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.LOAD_SESSIONS_SUCCESS:
      sessions = objectToArray(action.sessions, 'session_date');
      return updateState(state, {sessions: sessions,  allSessions: sessions, error: false});

    case actionTypes.LOAD_PERIODS: 
      periods = objectToSessionPeriods(action.sessions);
      console.log(periods);
      return updateState(state, {periods: periods, error: false});

    case actionTypes.UPDATE_PERIODS: 
      return updateState(state, {periods: objectToSessionPeriods({...state.sessions}), error: false});

    case actionTypes.ADD_SESSION_SUCCESS:
      const sessionUpdatedWithId = addId({...action.session}, action.id);
      sessions = sortBy(state.sessions.concat(sessionUpdatedWithId), 'session_date');
      return updateState(state, {sessions: sessions, allSessions: sessions, error: false})
    
    case actionTypes.DELETE_SESSION_SUCCESS:
      sessions = removeElementById(state.sessions, action.id);
      return updateState(state, {sessions: sessions, allSessions: sessions, error: false})

    case actionTypes.UPDATE_SESSION_SUCCESS:
      sessions = sortBy(replaceElementById(state.sessions, action.session, action.id), 'session_date');
      return updateState(state, {sessions: sessions, allSessions: sessions, error: false})

    case actionTypes.FAILED_LOAD:
      return updateState(state, {error: action.error})

    case actionTypes.FETCH_SESSION:
      return updateState(state, {selectedSession: action.session})

    case actionTypes.DEACTIVATE_SELECTED_SESSION:
      return updateState(state, {selectedSession: null})

    case actionTypes.FILTER_SESSIONS:
      return updateState(state, {sessions: filterSessionsByMonth([...state.allSessions], action.period)})

    case actionTypes.SET_PERIOD:
      return updateState(state, {period: action.period});

    default:
      return state;  
  }
}

export default reducer;