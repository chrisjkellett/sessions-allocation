import * as actionTypes from '../../actions/examiner-options/actionTypes';
import {examinerCheck, sameDayCheck, filterExaminers} from './utility';

const initial = {
  options: [],
  sameDaySessions: []
}

const reducer = (state = initial, action) => {
  switch(action.type){
    case actionTypes.CALCULATE_AVAILABLE_EXAMINERS: 
      return {...state, options: examinerCheck(action)};

    case actionTypes.CALCULATE_SAME_DAY_SESSIONS:  
      return {...state, sameDaySessions: sameDayCheck(action)};

    case actionTypes.FILTER_EXAMINERS:  
      return {...state, options: filterExaminers(action)};

    default:
      return state;  
  }
}

export default reducer;