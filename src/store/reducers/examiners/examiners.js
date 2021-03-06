import * as actionTypes from '../../actions/examiners/actionTypes';
import {
  sortBy,
  filterData,
  Availability,
} from '../utility';


const initialState = {
  examiners: null,
  selectedExaminer: null,
  filteredExaminers: null,
  filterValue: '',
  formActive: false,
}

let examiner;

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.LOAD_EXAMINERS_SUCCESS:
      const examiners = Object.keys(action.examiners)
        .map(a => ({...action.examiners[a], id: a, avail: Availability(), available: true}));
      return { ...state, examiners: sortBy(examiners) }

    case actionTypes.ADD_EXAMINER_SUCCESS:
      examiner = { ...action.examiner, id: action.id, avail: Availability(), available: true}
      return { ...state, examiners: sortBy(state.examiners.concat(examiner))}

    case actionTypes.DELETE_EXAMINER_SUCCESS:
      return { ...state, examiners: state.examiners.filter(e => e.id !== action.id) }

    case actionTypes.FETCH_EXAMINER:
      return { ...state, selectedExaminer: action.id ? state.examiners.find(s => s.id === action.id ) : null, formActive: true }

    case actionTypes.CLEAR_SELECTED_EXAMINER:
      return { ...state, selectedExaminer: null, formActive: false }

    case actionTypes.UPDATE_EXAMINER_SUCCESS:
      examiner = { ...action.examiner, id: action.id, avail: Availability(), available: true}
      return { ...state, examiners: sortBy(state.examiners.filter(e => e.id !== action.id).concat(examiner)) }

    case actionTypes.FILTER_EXAMINER:
      return { ...state, filteredExaminers: filterData(state.examiners, action), filterValue: action.value };

    case actionTypes.CLEAR_FILTERS:
      return { ...state, filteredExaminers: null }

    default:
      return state;  
  }
}

export default reducer;