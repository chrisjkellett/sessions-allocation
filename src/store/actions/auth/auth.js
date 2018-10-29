import * as actionTypes from './actionTypes';
import axios from 'axios';
import {AUTH_API} from '../../data';
import {setStorage, deleteStorage, getStorage, checkTokenValidity} from './utility';


export const authUser = (user) => {
  return dispatch => {
    axios.post(AUTH_API, user)
      .then(res => {
        setStorage(res.data, null);
        dispatch(authUserSuccess(res.data));
        dispatch(checkAuthTimeout(res.data.expiresIn));
    })
      .catch(error => {
        dispatch(authFail(error));
    })
  }
}

export const checkAuthState = () => {
  return dispatch => {
    const cache = getStorage();
    if(!cache.token){ 
      dispatch(logout()); 
    }
    
    else{
      const validToken = checkTokenValidity(cache);
      if(validToken && cache.token !== '9999'){
        dispatch(authUserSuccess(Object.assign({}, {email: cache.email, idToken: cache.token})))
        dispatch(checkAuthTimeout((new Date(cache.expiration).getTime() - new Date().getTime())/ 1000));
      }else
        dispatch(logout());
    }
  }
}

export const authUserSuccess = ({email, idToken}) => {
  return {
    type: actionTypes.AUTH_USER_SUCCESS,
    email: email,
    token: idToken
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_USER_FAIL,
    error: error.response ? error.response.data.error.message : 'SERVER_ERROR'
  }
}

export const checkAuthTimeout = (expiresIn) => {
  return dispatch => {
    setTimeout(()=> {
      dispatch(logout())
    }, expiresIn * 1000)
  }
}

export const logout = () => {
  deleteStorage();
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const clearErrors = () => {
  return {
    type: actionTypes.CLEAR_ERRORS,
  }
}