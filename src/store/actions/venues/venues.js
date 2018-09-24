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
};

export const loadVenuesSuccess = (data) => {
  return {
    type: actionTypes.LOAD_VENUE_SUCCESS,
    venues: data
  }
};

export const deleteVenue = (venue, token) => {
  return dispatch => {
    axios.delete('/venues/' + venue.id + '.json?auth=' + token)
      .then(() => {
        dispatch(deleteVenueSuccess(venue));
        dispatch(logResponse(venue, {type: 'venue', action: 'deleted'}));
      })
      .catch(error => {
        dispatch(logError(error, {type: 'session', action: 'delete'}));
      })
  }
};

export const deleteVenueSuccess = (venue) => {
  return {
    type: actionTypes.DELETE_VENUE_SUCCESS,
    venue: venue
  }
};

export const updateVenue = (venue, id, token) => {
  return dispatch => {
    axios.put('/venues/' + id + '.json?auth=' + token, venue)
      .then(() => {
        dispatch(updateVenueSuccess(venue));
        dispatch(logResponse(venue, {type: 'venue', action: 'updated'}));
      })
      .catch(error => {
        dispatch(logError(error, {type: 'venue', action: 'update'}));
      })
  }
};

export const updateVenueSuccess = (venue) => {
  return {
    type: actionTypes.UPDATE_VENUE_SUCCESS,
    venue: venue
  }
};

export const fetchVenue = (id) => {
  return {
    type: actionTypes.FETCH_VENUE,
    id: id
  }
};

export const clearSelectedVenue = () => {
  return {
    type: actionTypes.CLEAR_SELECTED_VENUE,
  }
};