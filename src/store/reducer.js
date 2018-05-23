import * as actionTypes from './actions/actionTypes';

const initialState = {
  examiners: null
}

const reducer = (state = initialState, action) => {

  switch(action.type){
    case actionTypes.SET_EXAMINERS:
      return {
        ...state,
        examiners: action.examiners
      }

    default:
      return state;  
  }
}

export default reducer;