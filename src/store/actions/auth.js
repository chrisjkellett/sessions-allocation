import * as actionTypes from './actionTypes';
import axios from 'axios';
import {AUTH_API} from '../data';


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

export const authUserFail = (error) => {
  return {
    type: actionTypes.AUTH_USER_FAIL,
    error: error
  }
}

export const authUser = (user) => {
  return dispatch => {
    dispatch(authUserStart());
    axios.post(AUTH_API, user)
      .then(res => {
        console.log(res.data);
        dispatch(authUserSuccess(res.data));
        dispatch(checkAuthTimeout(res.data.expiresIn));
    })
      .catch(error => {
        console.log(error);
        dispatch(authUserFail(error));
        //dispatch(regularUserStart())
    })
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