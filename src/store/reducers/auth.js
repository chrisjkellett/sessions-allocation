import * as actionTypes from '../actions/actionTypes';

const initialState = {
  session_user: null
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.INITIALISE_LOGIN: 
      return {
        session_user: 'hello'
      }

    default:
      return state;  
  }
}

export default reducer;