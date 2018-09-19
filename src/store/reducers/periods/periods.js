import * as actionTypes from '../../actions/actionTypes';
import {
  weeksFromObject, 
  setCurrentPeriodByWeek, 
  filterSessionsByWeek,
  setFromSessionPeriods,
  weeksFromArray,
} from './utility';
import {updateState, objectToArray, sortBy} from '../utility';

export const initialState = {
  periods: null,
  current: null,
  sessionsByPeriod: []
}

const reducer = (state = initialState, action) => {
  let weeks, months, periods, current, sessions;

  switch(action.type){
    case actionTypes.LOAD_PERIODS: 
      weeks = weeksFromObject(action.sessions);
      periods = setFromSessionPeriods(weeks);
      current = setCurrentPeriodByWeek(periods);
      sessions = filterSessionsByWeek(objectToArray(action.sessions), current);
      return updateState(state, {periods: periods, current: current, sessionsByPeriod: sortBy(sessions, 'session_date')});


    case actionTypes.UPDATE_PERIODS: 
      months = weeksFromArray(action.sessions);
      periods = setFromSessionPeriods(months);
      current = setCurrentPeriodByWeek(periods);
      sessions = filterSessionsByWeek(action.sessions, current);
      return updateState(state, {periods: periods, current: current, sessionsByPeriod: sortBy(sessions, 'session_date')});

    case actionTypes.HANDLE_PERIOD_SELECT: 
      sessions = filterSessionsByWeek(action.sessions, action.period);
      return updateState(state, {current: action.period, sessionsByPeriod: sessions});

    default:
      return state;  
  }
}

export default reducer;