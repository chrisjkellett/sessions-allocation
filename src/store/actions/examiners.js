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


export const addNewExaminer = (examiner, data) => {
  return {
    type: actionTypes.ADD_NEW_EXAMINER,
    examiner: examiner
  }
}

export const deleteExaminer = (id) => {
  return dispatch => {
    axios.delete('/examiners/' + id + '.json')
      .then(response => {
        console.log(response);
        dispatch(deleteExaminerSuccess(id))
      })
      .catch(error => {
        dispatch(failedLoad(error))
      })
  }
}


export const deleteExaminerSuccess = (id) => {
  return {
    type: actionTypes.DELETE_EXAMINER_SUCCESS,
    id: id
  }
}

export const failedLoad = (error) => {
  return {
    type: actionTypes.FAILED_LOAD,
    error: error
  }
} 