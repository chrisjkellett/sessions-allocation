import * as actionTypes from './../actionTypes';
import axios from 'axios';
import {AUTH_API} from '../../data';
import {setStorage} from './utility';

export const authUserStart = () => {
  return {
    type: actionTypes.AUTH_USER_START
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
    error: error
  }
}

export const authUser = (user, regUser) => {
  return dispatch => {
    dispatch(authUserStart());
    axios.post(AUTH_API, user)
      .then(res => {
        setStorage(res.data);
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
      setStorage({idToken: '9999', expiresIn: 3600});
      dispatch(authRegularUserSuccess(user))
    }else 
      dispatch(authFail(error))
  }
}

export const authRegularUserSuccess = (user) => {
  return {
    type: actionTypes.AUTH_REGULAR_USER_SUCCESS,
    user: user
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
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}