import * as actionTypes from '../actions/actionTypes';

const initialState = {
  examiners: null,
  error: false
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.SET_EXAMINERS:
      return {
        ...state,
        examiners: action.examiners,
        error: false
      }

    case actionTypes.FAILED_LOAD:
      return {
        ...state,
        error: true
      }

    default:
      return state;  
  }
}

export default reducer;