import * as actionTypes from '../../actions/examiner-options/actionTypes';
import { 
  examinerCheck, filterExaminers, supportCheck, filterSupport, selectExaminer, compareAvailableAndSelected 
} from './utility';

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
      const support = supportCheck(action);
      return { 
        ...state, 
        ex_options: examiners, 
        supp_options: support,
        sessionExaminers: compareAvailableAndSelected(examiners, state.sessionExaminers),
        sessionSupport: compareAvailableAndSelected(support, state.sessionSupport),
    };

    case actionTypes.SELECT_EXAMINER:  
      return { ...state, sessionExaminers: selectExaminer(state.sessionExaminers, action.examiner) }

    case actionTypes.SELECT_SUPPORT:
      return { ...state, sessionSupport: selectExaminer(state.sessionSupport, action.support) }

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