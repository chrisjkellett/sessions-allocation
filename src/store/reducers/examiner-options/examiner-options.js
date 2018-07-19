import * as actionTypes from '../../actions/examiner-options/actionTypes';
import {examinerCheck, sameDayCheck} from './utility';

const initial = {
  options: [],
  sameDaySessions: []
}

const reducer = (state = initial, action) => {
  switch(action.type){
    case actionTypes.CALCULATE_AVAILABLE_EXAMINERS: 
      return {...state, options: examinerCheck(action)};

    case actionTypes.CALCULATE_SAME_DAY_SESSIONS:  
      console.log(sameDayCheck(action));
      return {...state, sameDaySessions: sameDayCheck(action)};

    default:
      return state;  
  }
}

export default reducer;