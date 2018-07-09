import * as actionTypes from '../actions/actionTypes';

const initialState = {
  updated: null
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.LOG_RESPONSE: 
      console.log(action.response);
      return {
        updated: action.response
      }

    default:
      return state;  
  }
}

export default reducer;