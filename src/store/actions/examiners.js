import * as actionTypes from './actionTypes';
import axios from '../../axios';
import {logResponse} from './general';
import {SIGNUP_API} from '../data';

export const loadExaminers = () => {
  return dispatch => {
    axios.get('/examiners.json')
      .then(response => {
        dispatch(loadExaminersSuccess(response.data))
      })
      .catch(error => {
        dispatch(failedLoad(error))
      })
  }
}

export const loadExaminersSuccess = (data) => {
  return {
    type: actionTypes.LOAD_EXAMINERS_SUCCESS,
    examiners: data
  }
}

export const registerExaminerStart = () => {
  return {
    type: actionTypes.REGISTER_EXAMINER_START
  }
}

export const registerExaminerSuccess = (data) => {
  return {
    type: actionTypes.REGISTER_EXAMINER_SUCCESS,
    data: data
  }
}

export const registerExaminerFail = (error) => {
  return {
    type: actionTypes.REGISTER_EXAMINER_FAIL,
    error: error
  }
}

export const registerExaminer = (userForAuth, user) => {
  return dispatch => {
    console.log(userForAuth);
    dispatch(registerExaminerStart());
    axios.post(SIGNUP_API, userForAuth)
      .then(res => {
        dispatch(registerExaminerSuccess(res.data));
        dispatch(addExaminer(user));
    })
      .catch(error => {
        console.log(error);
        dispatch(registerExaminerFail(error));
    })
  }
}

export const addExaminer = (examiner) => {
  return dispatch => {
    axios.post('/examiners.json', examiner)
      .then(response => {
        dispatch(addExaminerSuccess(examiner, response.data.name));
        dispatch(logResponse(examiner, {type: 'examiners', action: 'added'}));
      })
      .catch(error => {
        dispatch(failedLoad(error))
      })
  }
}

export const addExaminerSuccess = (examiner, id) => {
  return {
    type: actionTypes.ADD_EXAMINER_SUCCESS,
    examiner: examiner,
    id: id
  }
}

export const updateExaminer = (examiner, id) => {
  return dispatch => {
    axios.put('/examiners/' + id + '.json', examiner)
      .then(response => {
        dispatch(updateExaminerSuccess(examiner, id));
        dispatch(logResponse(examiner, {type: 'examiners', action: 'updated'}));
      })
      .catch(error => {
        dispatch(failedLoad(error))
      })
  }
}

export const updateExaminerSuccess = (examiner, id) => {
  return {
    type: actionTypes.UPDATE_EXAMINER_SUCCESS,
    examiner: examiner,
    id: id
  }
}

export const deleteExaminer = (examiner) => {
  const {id} = examiner;
  return dispatch => {
    axios.delete('/examiners/' + id + '.json')
      .then(response => {
        dispatch(deleteExaminerSuccess(id));
        dispatch(logResponse(examiner, {type: 'examiners', action: 'deleted'}));
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

export const fetchExaminer = (examiner) => {
  return {
    type: actionTypes.FETCH_EXAMINER,
    examiner: examiner
  }
}

export const deActivateSelectedExaminer = () => {
  return {
    type: actionTypes.DEACTIVATE_SELECTED_EXAMINER
  }
}