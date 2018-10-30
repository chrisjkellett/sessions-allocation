import * as actionTypes from '../../actions/venues/actionTypes';
import { filterData } from '../utility';
import { sortByName } from './utility';

const initial = {
  venues: [],
  filteredVenues: null,
  error: false,
  selectedVenue: null,
  formActive: false,
}

const reducer = (state = initial, action) => {
  switch(action.type){
    case actionTypes.ADD_VENUE_SUCCESS: 
      const venue = {...action.venue, id: action.id}
      return { ...state, venues: sortByName(state.venues.concat(venue)) };

    case actionTypes.UPDATE_VENUE_SUCCESS:
      return { ...state, venues: sortByName(state.venues.filter(v => v.id !== action.id).concat(action.venue)) }
    
    case actionTypes.LOAD_VENUE_SUCCESS: 
      const venues =  Object.keys(action.venues).map(a => ({...action.venues[a], id: a }));
      return { ...state, venues: sortByName(venues) };

    case actionTypes.DELETE_VENUE_SUCCESS:
      return { ...state, venues: state.venues.filter(v => v.id !== action.venue.id) };

    case actionTypes.FETCH_VENUE:
      return { ...state, selectedVenue: action.id ? state.venues.find(v => v.id === action.id): null, formActive: true };

    case actionTypes.CLEAR_SELECTED_VENUE:
      return { ...state, selectedVenue: null, formActive: false }
    
    case actionTypes.FILTER_VENUE:
      return {...state, filteredVenues: filterData(state.venues, action)};

    case actionTypes.CLEAR_FILTERS:
      return { ...state, filteredVenues: null }

    default:
      return state;  
  }
}

export default reducer;