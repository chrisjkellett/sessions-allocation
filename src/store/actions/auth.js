import * as actionTypes from './actionTypes';

export const initialiseLogin = (data) => {
  return {
    type: actionTypes.INITIALISE_LOGIN,
    data: data
  }

}