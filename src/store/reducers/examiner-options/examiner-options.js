import * as actionTypes from '../../actions/examiner-options/actionTypes';

const initial = {
  options: []
}

const reducer = (state = initial, action) => {
  switch(action.type){
    case actionTypes.CALCULATE_AVAILABLE_EXAMINERS: 
      return {...state, options: action.examiners};

    default:
      return state;  
  }
}

export default reducer;