import * as actionTypes from '../actions/actionTypes';

const initialState = {
  updated: null
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.LOG_RESPONSE: 
      return {
        updated: action.response
      }

    case actionTypes.REFRESH_LOG: 
      return {
        updated: null
      }

    default:
      return state;  
  }
}

export default reducer;