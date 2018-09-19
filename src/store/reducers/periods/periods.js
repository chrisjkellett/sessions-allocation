import * as actionTypes from '../../actions/actionTypes';
import {
  monthsFromObject,
  weeksFromArray,
  setCurrentPeriodByMonth,
  filterSessionsByMonth,
  createSet,
  monthsFromArray
} from './utility';
import {objectToArray, sortBy} from '../utility';

export const initialState = {
  periods: null,
  current: null,
  sessionsByPeriod: [],
  weeks: null
}

const reducer = (state = initialState, action) => {
  let periods, current, sessions;

  switch(action.type){
    case actionTypes.LOAD_PERIODS: 
      periods = createSet(monthsFromObject(action.sessions));
      current = setCurrentPeriodByMonth(periods);
      sessions = filterSessionsByMonth(objectToArray(action.sessions), current);
      return { 
        periods: periods, 
        current: current, 
        sessionsByPeriod: sortBy(sessions, 'session_date'),
        weeks: createSet(weeksFromArray(sessions)),
      };

    case actionTypes.UPDATE_PERIODS: 
      periods = createSet(monthsFromArray(action.sessions));
      current = setCurrentPeriodByMonth(periods);
      sessions = filterSessionsByMonth(action.sessions, current);
      return { 
        periods: periods, 
        current: current, 
        sessionsByPeriod: sortBy(sessions, 'session_date'),
        weeks: createSet(weeksFromArray(sessions)),
      };

    case actionTypes.HANDLE_PERIOD_SELECT: 
      sessions = filterSessionsByMonth(action.sessions, action.period);
      return { 
        ...state, 
        current: action.period, 
        sessionsByPeriod: sessions,
        weeks:  createSet(weeksFromArray(sessions)),
      };

    default:
      return state;  
  }
}

export default reducer;