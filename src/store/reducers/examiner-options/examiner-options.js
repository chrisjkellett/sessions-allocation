import * as actionTypes from '../../actions/examiner-options/actionTypes';
import { examinerCheck, filterExaminers, supportCheck, filterSupport, selectExaminer } from './utility';

const initial = {
  ex_options: [],
  sessionExaminers: [],
  supp_options: [],
  sessionSupport: [],
  sameDaySessions: []
}

const reducer = (state = initial, action) => {
  switch(action.type){
    case actionTypes.CALCULATE_AVAILABLE_EXAMINERS: 
      const examiners = examinerCheck(action);
      return { 
        ...state, 
        ex_options: examiners, 
        supp_options: supportCheck(action),
        sessionExaminers: examiners
        .filter(e => e.available)
        .map(e => e.name)
        .filter(e => state.sessionExaminers.includes(e))
    };

    case actionTypes.SELECT_EXAMINER:  
      return { ...state, sessionExaminers: selectExaminer(state.sessionExaminers, action.examiner)}

    case actionTypes.CLEAR_SELECTED_EXAMINERS:
      return { ...state, sessionExaminers: [], sessionSupport: [] }

    case actionTypes.FILTER_EXAMINERS:  
      return {...state, ex_options: filterExaminers(action)};

    case actionTypes.FILTER_SUPPORT:  
      return {...state, supp_options: filterSupport(action)};

    default:
      return state;  
  }
}

export default reducer;