import * as actionTypes from './actionTypes';

export const initialiseLogin = (examiners, userToBeChecked) => {
  return {
    type: actionTypes.INITIALISE_LOGIN,
    examiners: examiners,
    userToBeChecked: userToBeChecked
  }
}

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (data) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    data: data
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const authLoad = (user) => {
  return dispatch => {
    dispatch(authStart())
  }
}