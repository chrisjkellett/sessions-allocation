import * as actionTypes from '../../actions/venues/actionTypes';

const initial = {
  venues: [],
  error: false
}

const reducer = (state = initial, action) => {
  switch(action.type){
    case actionTypes.ADD_VENUE_SUCCESS: 
      console.log(action);
      return {...state, venues: state.venues.concat(action.venue)};

    default:
      return state;  
  }
}

export default reducer;