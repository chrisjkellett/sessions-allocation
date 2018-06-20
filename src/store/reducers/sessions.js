import * as actionTypes from '../actions/actionTypes';
import {
  updateState,
  addId,
  removeElementById
} from './utility';

const initialState = {
  sessions: null,
  error: false
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

    case actionTypes.FAILED_LOAD:
      return updateState(state, {error: action.error})

    default:
      return state;  
  }
}

export default reducer;