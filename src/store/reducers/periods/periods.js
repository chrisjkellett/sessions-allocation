import * as actionTypes from '../../actions/actionTypes';
import {
  weeksFromObject, 
  monthsFromObject,
  setCurrentPeriodByWeek, 
  setCurrentPeriodByMonth,
  filterSessionsByWeek,
  filterSessionsByMonth,
  setFromSessionPeriods,
  weeksFromArray,
  monthsFromArray
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
      months = monthsFromObject(action.sessions);
      periods = setFromSessionPeriods(months);
      current = setCurrentPeriodByMonth(periods);
      sessions = filterSessionsByMonth(objectToArray(action.sessions), current);
      return updateState(state, {periods: periods, current: current, sessionsByPeriod: sortBy(sessions, 'session_date')});


    case actionTypes.UPDATE_PERIODS: 
      months = monthsFromArray(action.sessions);
      periods = setFromSessionPeriods(months);
      current = setCurrentPeriodByMonth(periods);
      sessions = filterSessionsByMonth(action.sessions, current);
      return updateState(state, {periods: periods, current: current, sessionsByPeriod: sortBy(sessions, 'session_date')});

    case actionTypes.HANDLE_PERIOD_SELECT: 
      sessions = filterSessionsByMonth(action.sessions, action.period);
      return updateState(state, {current: action.period, sessionsByPeriod: sessions});

    default:
      return state;  
  }
}

export default reducer;