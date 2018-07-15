import * as actionTypes from '../actions/actionTypes';

const initial = {
  updated: null,
  map: null,
  error: null
}

const reducer = (state = initial, action) => {
  switch(action.type){
    case actionTypes.LOG_RESPONSE: 
      return {...state, updated: action.response, map: action.map}

    case actionTypes.LOG_ERROR: 
      return {...state, error: action.errorMessage, map: action.map}

    case actionTypes.REFRESH_LOG: 
      return {...initial}

    default:
      return state;  
  }
}

export default reducer;