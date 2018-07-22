import * as actionTypes from '../actions/examiners/actionTypes';
import {
  updateState, 
  removeElementById,
  replaceElementById,
  addId,
  objectToArray,
  sortBy,
  checkExaminerOnLoad,
  Availability
} from './utility';

const initialState = {
  examiners: null,
  error: false,
  editing: false, 
  selectedExaminer: null
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.LOAD_EXAMINERS_SUCCESS:
      const isExaminers = true;
      return updateState(state, {examiners: objectToArray(action.examiners, 'name', isExaminers), error: false})

    case actionTypes.ADD_EXAMINER_SUCCESS:
      const a = addId({...action.examiner}, action.id);
      const b = {...a, avail: Availability(), available: true}
      return updateState(state, {examiners: sortBy(state.examiners.concat(b), 'name'), error: false})

    case actionTypes.DELETE_EXAMINER_SUCCESS:
      return updateState(state, {examiners: removeElementById(state.examiners, action.id), error: false})

    case actionTypes.UPDATE_EXAMINER_SUCCESS:
      return updateState(state, {examiners: sortBy(replaceElementById(state.examiners, action.examiner, action.id), 'name'), error: false})

    case actionTypes.FAILED_LOAD:
      return updateState(state, {error: true})

    case actionTypes.FETCH_EXAMINER:
      return updateState(state, {selectedExaminer: action.examiner})

    case actionTypes.FETCH_EXAMINER_ON_LOAD:
      return {...state, selectedExaminer: checkExaminerOnLoad(action)};

    case actionTypes.DEACTIVATE_SELECTED_EXAMINER:
      return updateState(state, {selectedExaminer: null})

    default:
      return state;  
  }
}

export default reducer;