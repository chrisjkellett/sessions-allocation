import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const loadExaminers = () => {
  return dispatch => {
    axios.get('/examiners.json')
      .then(res => {
        dispatch(setExaminers(res.data))
      })
      .error(error => {
        console.log(error);
      })
  }
}

export const setExaminers = (data) => {
  return {
    type: actionTypes.SET_EXAMINERS,
    examiners: data
  }
}