import * as actionTypes from '../actions/actionTypes';

const initial = {
  session_user: null,
  token: null,
  admin: false,
  error: false
}

const reducer = (state = initial, action) => {
  switch(action.type){
    case actionTypes.AUTH_USER_SUCCESS: 
      return {...state, session_user: action.email, token: action.token};

    case actionTypes.AUTH_LOGOUT: 
      return {...initial};

    default:
      return state;  
  }
}

export default reducer;