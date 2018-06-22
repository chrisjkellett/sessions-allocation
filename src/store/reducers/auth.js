import * as actionTypes from '../actions/actionTypes';
import {isValidUser, checkIfAdmin} from './utility';

const initialState = {
  session_user: null,
  admin: false,
  error: false
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.INITIALISE_LOGIN: 
      const user = isValidUser(action.examiners, action.userToBeChecked);
      return {
        session_user: user,
        admin: checkIfAdmin(user),
        error: user === 'not found' ? true : false
      }

    default:
      return state;  
  }
}

export default reducer;