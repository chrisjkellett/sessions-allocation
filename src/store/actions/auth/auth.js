import * as actionTypes from './actionTypes';
import axios from 'axios';
import {AUTH_API} from '../../data';
import {setStorage, deleteStorage, getStorage, checkTokenValidity} from './utility';
import {fetchExaminer} from '../examiners/examiners';

export const authUserStart = () => {
  return {
    type: actionTypes.AUTH_USER_START
  }
}

export const authUser = (user, regUser) => {
  return dispatch => {
    dispatch(authUserStart());
    axios.post(AUTH_API, user)
      .then(res => {
        setStorage(res.data, null);
        dispatch(authUserSuccess(res.data));
        dispatch(checkAuthTimeout(res.data.expiresIn));
    })
      .catch(error => {
        dispatch(authRegularUser(regUser, error));
    })
  }
}

export const authRegularUser = (user, error) => {
  return dispatch => {
    if(user){
      setStorage({idToken: '9999', expiresIn: 3600, email: null}, user.name);
      dispatch(authRegularUserSuccess(user))
      dispatch(fetchExaminer(user))
    }else 
      dispatch(authFail(error))
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
        dispatch(checkAuthTimeout((new Date(cache.expiration).getTime() - new Date().getTime())/ 1000))
      }else if(validToken)
        dispatch(authRegularUserSuccess(Object.assign({}, {name: cache.name})));
      else
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

export const authRegularUserSuccess = (user) => {
  return {
    type: actionTypes.AUTH_REGULAR_USER_SUCCESS,
    user: user
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_USER_FAIL,
    error: error
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