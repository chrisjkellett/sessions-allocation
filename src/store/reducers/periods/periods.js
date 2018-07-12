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
  sessions_by_period: null
}

const reducer = (state = initialState, action) => {
  let months, periods, current, sessions;

  switch(action.type){
    case actionTypes.LOAD_PERIODS: 
      months = monthsFromObject(action.sessions);
      periods = setFromSessionPeriods(months);
      current = setCurrentPeriod(periods);
      sessions = filterSessionsByMonth(objectToArray(action.sessions), current);
      return updateState(state, {periods: periods, current: current, sessions_by_period: sessions});

    case actionTypes.UPDATE_PERIODS: 
      months = monthsFromArray(action.sessions);
      periods = setFromSessionPeriods(months);
      current = setCurrentPeriod(periods);
      sessions = filterSessionsByMonth(action.sessions, current);
      return updateState(state, {periods: periods, current: current, sessions_by_period: sessions});

    default:
      return state;  
  }
}

export default reducer;