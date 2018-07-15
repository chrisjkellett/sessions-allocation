import * as actionTypes from '../../actions/actionTypes';
import {
  monthsFromObject, 
  setCurrentPeriod, 
  filterSessionsByMonth,
  setFromSessionPeriods,
  monthsFromArray} from './utility';
import {updateState, objectToArray} from '../utility';

const initialState = {
  periods: null,
  current: null,
  sessionsByPeriod: []
}

const reducer = (state = initialState, action) => {
  let months, periods, current, sessions;

  switch(action.type){
    case actionTypes.LOAD_PERIODS: 
      months = monthsFromObject(action.sessions);
      periods = setFromSessionPeriods(months);
      current = setCurrentPeriod(periods);
      sessions = filterSessionsByMonth(objectToArray(action.sessions), current);
      return updateState(state, {periods: periods, current: current, sessionsByPeriod: sessions});

    case actionTypes.UPDATE_PERIODS: 
      months = monthsFromArray(action.sessions);
      periods = setFromSessionPeriods(months);
      current = setCurrentPeriod(periods);
      sessions = filterSessionsByMonth(action.sessions, current);
      return updateState(state, {periods: periods, current: current, sessionsByPeriod: sessions});

    case actionTypes.HANDLE_PERIOD_SELECT: 
      sessions = filterSessionsByMonth(action.sessions, action.period);
      return updateState(state, {current: action.period, sessionsByPeriod: sessions});

    default:
      return state;  
  }
}

export default reducer;