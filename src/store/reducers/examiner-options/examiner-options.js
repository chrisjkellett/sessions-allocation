import * as actionTypes from '../../actions/examiner-options/actionTypes';
import { examinerCheck, filterExaminers, supportCheck, filterSupport, selectExaminer } from './utility';

const initial = {
  ex_options: [],
  examinersSelectedForSession: [],
  supp_options: [],
  supportSelectedForSession: [],
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
        examinersSelectedForSession: examiners
        .filter(e => e.available)
        .map(e => e.name)
        .filter(e => state.examinersSelectedForSession.includes(e))
    };

    case actionTypes.SELECT_AVAILABLE_EXAMINERS:  
      return { ...state, examinersSelectedForSession: selectExaminer(state.examinersSelectedForSession, action.examiner)}

    case actionTypes.FILTER_EXAMINERS:  
      return {...state, ex_options: filterExaminers(action)};

    case actionTypes.FILTER_SUPPORT:  
      return {...state, supp_options: filterSupport(action)};

    default:
      return state;  
  }
}

export default reducer;