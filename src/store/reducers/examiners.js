import * as actionTypes from '../actions/actionTypes';
import {
  updateState, 
  sortByName, 
  removeElementById,
  replaceElementById,
  addExaminerId
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
      return updateState(state, {examiners: action.examiners, error: false})

    case actionTypes.ADD_EXAMINER_SUCCESS:
      const examinerUpdatedWithId = addExaminerId({...action.examiner}, action.id);
      return updateState(state, {examiners: sortByName(state.examiners.concat(examinerUpdatedWithId)), error: false})

    case actionTypes.DELETE_EXAMINER_SUCCESS:
      return updateState(state, {examiners: removeElementById(state.examiners, action.id), error: false})

    case actionTypes.UPDATE_EXAMINER_SUCCESS:
      return updateState(state, {examiners: replaceElementById(state.examiners, action.examiner, action.id), error: false})

    case actionTypes.FAILED_LOAD:
      return updateState(state, {error: true})

    case actionTypes.FETCH_EXAMINER_FOR_EDITING:
      return updateState(state, {selectedExaminer: action.examiner})

    case actionTypes.DEACTIVATE_SELECTED_EXAMINER:
      return updateState(state, {selectedExaminer: null})

    default:
      return state;  
  }
}

export default reducer;