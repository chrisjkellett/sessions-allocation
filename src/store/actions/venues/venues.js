import * as actionTypes from './actionTypes';
import axios from '../../../axios';
import {logResponse, logError} from '../general';

export const addVenue = (venue, token) => {
  return dispatch => {
    axios.post('/venues.json?auth=' + token, venue)
      .then(response => {
        dispatch(addVenueSuccess(venue, response.data.name));
        dispatch(logResponse(venue, {type: 'venues', action: 'added'}));
      })
      .catch(error => {
        dispatch(logError(error, {type: 'venues', action: 'added'}));
      })
  }
};

export const addVenueSuccess = (venue, id) => {
  return {
    type: actionTypes.ADD_VENUE_SUCCESS,
    venue: venue,
    id: id
  }
};

export const loadVenues = () => {
  return dispatch => {
    axios.get('/venues.json')
      .then(response => {
        dispatch(loadVenuesSuccess(response.data));
      })
      .catch(error => {
        dispatch(logError(error, {type: 'venues', action: 'load'}))
      })
  }
}

export const loadVenuesSuccess = (data) => {
  return {
    type: actionTypes.LOAD_VENUE_SUCCESS,
    venues: data
  }
}