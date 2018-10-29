import * as actionTypes from '../../actions/auth/actionTypes';

const initial = {
  session_user: null,
  token: null,
  error: false
}

const reducer = (state = initial, action) => {
  switch(action.type){
    case actionTypes.AUTH_USER_SUCCESS: 
      return { ...state, session_user: action.email, token: action.token };

    case actionTypes.AUTH_USER_FAIL:
      return { ...state, error: action.error }

    case actionTypes.AUTH_LOGOUT: 
      return { ...initial };

    case actionTypes.CLEAR_ERRORS:
      return { ...state, error: false }

    default:
      return state;  
  }
}

export default reducer;