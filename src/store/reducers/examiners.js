import * as actionTypes from '../actions/actionTypes';
import {updateState, sortByName} from './utility';

const initialState = {
  examiners: null,
  error: false
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.SET_EXAMINERS:
      return updateState(state, {examiners: action.examiners, error: false})

    case actionTypes.ADD_NEW_EXAMINER:
      console.log('dispatched examiner');
      return updateState(state, {examiners: sortByName(state.examiners.concat(action.examiner)), error: false})

    case actionTypes.FAILED_LOAD:
      return updateState(state, {error: true})

    default:
      return state;  
  }
}

export default reducer;