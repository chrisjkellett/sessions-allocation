import * as actionTypes from '../../actions/examiner-options/actionTypes';
import {examinerCheck, sameDayCheck, filterExaminers, supportCheck, filterSupport} from './utility';

const initial = {
  ex_options: [{name: 'diana'}],
  supp_options: [],
  sameDaySessions: []
}

const reducer = (state = initial, action) => {
  switch(action.type){
    case actionTypes.CALCULATE_AVAILABLE_EXAMINERS: 
      return {...state, ex_options: examinerCheck(action), supp_options: supportCheck(action)};

    case actionTypes.CALCULATE_SAME_DAY_SESSIONS:  
      return {...state, sameDaySessions: sameDayCheck(action)};

    case actionTypes.FILTER_EXAMINERS:  
      return {...state, ex_options: filterExaminers(action)};

    case actionTypes.FILTER_SUPPORT:  
      return {...state, supp_options: filterSupport(action)};

    default:
      return state;  
  }
}

export default reducer;