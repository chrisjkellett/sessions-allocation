import * as actionTypes from '../../actions/venues/actionTypes';
import { objectToArray } from '../utility';
import { sortByName } from './utility';

const initial = {
  venues: [],
  error: false,
  selectedVenue: null
}

const reducer = (state = initial, action) => {
  switch(action.type){
    case actionTypes.ADD_VENUE_SUCCESS: 
      const venue = {...action.venue, id: action.id}
      return { ...state, venues: sortByName(state.venues.concat(venue)) };

    case actionTypes.UPDATE_VENUE_SUCCESS:
      return { ...state, venues: sortByName(state.venues.filter(v => v.id !== action.id).concat(action.venue)) }
    
    case actionTypes.LOAD_VENUE_SUCCESS: 
      return { ...state, venues: sortByName(objectToArray(action.venues)) };

    case actionTypes.DELETE_VENUE_SUCCESS:
      return { ...state, venues: state.venues.filter(v => v.id !== action.venue.id) };

    case actionTypes.FETCH_VENUE:
      return { ...state, selectedVenue: state.venues.find(v => v.id === action.id) };

    case actionTypes.CLEAR_SELECTED_VENUE:
      return { ...state, selectedVenue: null }

    default:
      return state;  
  }
}

export default reducer;