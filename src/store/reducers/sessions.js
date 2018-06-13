import * as actionTypes from '../actions/actionTypes';
import {
  updateState
} from './utility';

const initialState = {
  sessions: null,
  error: false
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.LOAD_SESSIONS_SUCCESS:
      return updateState(state, {sessions: action.sessions, error: false})

    case actionTypes.FAILED_LOAD:
      return updateState(state, {error: true})

    default:
      return state;  
  }
}

export default reducer;