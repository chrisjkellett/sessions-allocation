import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const loadExaminers = () => {
  return dispatch => {
    axios.get('/examiners.json')
      .then(response => {
        dispatch(setExaminers(response.data))
    })
  }
}

export const setExaminers = (data) => {
  return {
    type: actionTypes.SET_EXAMINERS,
    examiners: data
  }
}