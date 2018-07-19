import * as actionTypes from '../../actions/examiner-options/actionTypes';
import {examinerCheck} from './utility';

const initial = {
  options: []
}

const reducer = (state = initial, action) => {
  switch(action.type){
    case actionTypes.CALCULATE_AVAILABLE_EXAMINERS: 
      console.log(action.session);
      return {...state, options: examinerCheck(action)};

    default:
      return state;  
  }
}

export default reducer;