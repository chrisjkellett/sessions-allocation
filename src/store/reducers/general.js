import * as actionTypes from '../actions/actionTypes';

const initialState = {
  updated: null,
  map: null
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.LOG_RESPONSE: 
      return {
        updated: action.response,
        map: action.map
      }

    case actionTypes.REFRESH_LOG: 
      return {
        updated: null,
        map: null
      }

    default:
      return state;  
  }
}

export default reducer;