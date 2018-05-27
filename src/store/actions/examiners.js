import * as actionTypes from './actionTypes';
import axios from '../../axios';
import {objectToArray} from './utility';

export const loadExaminers = () => {
  return dispatch => {
    axios.get('/examiners.json')
      .then(response => {
        dispatch(setExaminers(objectToArray(response.data)))
      })
      .catch(error => {
        dispatch(failedLoad(error))
      })
  }
}

export const setExaminers = (data) => {
  return {
    type: actionTypes.SET_EXAMINERS,
    examiners: data
  }
}

export const saveNewExaminer = (examiner) => {
  return dispatch => {
    axios.post('/examiners.json', examiner)
      .then(response => {
        dispatch(addNewExaminer(examiner))
      })
      .catch(error => {
        dispatch(failedLoad(error))
      })
  }
}


export const addNewExaminer = (examiner) => {
  return {
    type: actionTypes.ADD_NEW_EXAMINER,
    examiner: examiner
  }
}

export const failedLoad = (error) => {
  return {
    type: actionTypes.FAILED_LOAD,
    error: error
  }
} 