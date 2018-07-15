import * as actionTypes from '../actions/actionTypes';

const initialState = {
  session_user: null,
  token: null,
  admin: false,
  error: false
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.AUTH_USER_SUCCESS: 
      return {...state, session_user: action.email, token: action.token};

    default:
      return state;  
  }
}

export default reducer;