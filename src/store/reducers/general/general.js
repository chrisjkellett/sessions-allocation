import * as actionTypes from '../../actions/general/actionTypes';

const initial = {
  updated: null,
  map: null,
  error: null,
  serverError: false,
}

const reducer = (state = initial, action) => {
  switch(action.type){
    case actionTypes.LOG_RESPONSE: 
      return {...state, updated: action.response, map: action.map}

    case actionTypes.LOG_ERROR: 
      return {...state, error: action.errorMessage, map: action.map}

    case actionTypes.LOG_SERVER_ERROR: 
      return {...state, serverError: action.map}

    case actionTypes.REFRESH_LOG: 
      return { ...state, updated: null, map: null, error: null }

    default:
      return state;  
  }
}

export default reducer;