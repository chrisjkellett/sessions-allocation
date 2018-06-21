import * as actionTypes from '../actions/actionTypes';
import {
  updateState,
  addId,
  removeElementById,
  replaceElementById
} from './utility';

const initialState = {
  sessions: null,
  error: false,
  editing: false,
  selectedSession: null
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.LOAD_SESSIONS_SUCCESS:
      return updateState(state, {sessions: action.sessions, error: false});

    case actionTypes.ADD_SESSION_SUCCESS:
      const sessionUpdatedWithId = addId({...action.session}, action.id);
      return updateState(state, {sessions: state.sessions.concat(sessionUpdatedWithId), error: false})
    
    case actionTypes.DELETE_SESSION_SUCCESS:
      return updateState(state, {sessions: removeElementById(state.sessions, action.id), error: false})

    case actionTypes.UPDATE_SESSION_SUCCESS:
      console.log(action.id);
      console.log(action.session);
      return updateState(state, {sessions: replaceElementById(state.sessions, action.session, action.id), error: false})

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