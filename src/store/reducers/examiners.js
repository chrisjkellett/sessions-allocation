import * as actionTypes from '../actions/actionTypes';
import {updateState} from './utility';

const initialState = {
  examiners: null,
  error: false
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.SET_EXAMINERS:
      return updateState(state, {examiners: action.examiners, error: false})

    case actionTypes.FAILED_LOAD:
      return updateState(state, {error: true})

    default:
      return state;  
  }
}

export default reducer;