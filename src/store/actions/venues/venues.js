import * as actionTypes from './actionTypes';
import axios from '../../../axios';
import {logResponse, logError} from '../general';

export const addVenue = (venue, token) => {
  return dispatch => {
    axios.post('/venues.json?auth=' + token, venue)
      .then(response => {
        dispatch(addVenueSuccess(venue, response.data.name));
        dispatch(logResponse(venue, {type: 'venue', action: 'added'}));
      })
      .catch(error => {
        dispatch(logError(error, {type: 'venue', action: 'added'}));
      })
  }
}

export const addVenueSuccess = (venue, id) => {
  return {
    type: actionTypes.ADD_VENUE_SUCCESS,
    venue: venue,
    id: id
  }
}