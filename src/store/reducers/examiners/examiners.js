import * as actionTypes from '../../actions/examiners/actionTypes';
import {
  objectToArray,
  sortBy,
  filterData,
  Availability,
} from '../utility';


const initialState = {
  examiners: null,
  error: false,
  editing: false, 
  selectedExaminer: null,
  filteredExaminers: null
}

let isExaminers = true;

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.LOAD_EXAMINERS_SUCCESS:
      const examiners = objectToArray(action.examiners, isExaminers);
      return { ...state, examiners: sortBy(examiners) }

    case actionTypes.ADD_EXAMINER_SUCCESS:
      const examiner = { ...action.examiner, id: action.id, avail: Availability(), available: true}
      return { ...state, examiners: sortBy(state.examiners.concat(examiner))}

    case actionTypes.DELETE_EXAMINER_SUCCESS:
      return { ...state, examiners: state.examiners.filter(e => e.id !== action.id) }

    // case actionTypes.UPDATE_EXAMINER_SUCCESS:
    //   return updateState(state, {examiners: sortBy(replaceElementById(state.examiners, action.examiner, action.id), 'name'), error: false})

    // case actionTypes.FAILED_LOAD:
    //   return updateState(state, {error: true})

    // case actionTypes.FETCH_EXAMINER:
    //   return updateState(state, {selectedExaminer: action.examiner})

    // case actionTypes.FETCH_EXAMINER_ON_LOAD:
    //   return {...state, selectedExaminer: checkExaminerOnLoad(action)};

    // case actionTypes.DEACTIVATE_SELECTED_EXAMINER:
    //   return updateState(state, {selectedExaminer: null})

    case actionTypes.FILTER_EXAMINER:
      return {...state, filteredExaminers: filterData(state.examiners, action)};

    default:
      return state;  
  }
}

export default reducer;