import * as actionTypes from '../../actions/periods/actionTypes';
import {
  monthsFromObject,
  weeksFromArray,
  setCurrentPeriodByMonth,
  filterSessionsByMonth,
  filterSessionsByWeek,
  createSet,
  monthsFromArray
} from './utility';

import { objectToArray, sortBy } from '../utility';

export const initialState = {
  periods: null,
  current: null,
  sessionsByPeriod: [],
  weeks: null,
  sessionsByWeek: [],
  weekFilteredBy: null,
}

const reducer = (state = initialState, action) => {
  let periods, current, sessions, isEmpty;

  switch(action.type){
    case actionTypes.LOAD_PERIODS: 
      isEmpty = Object.keys(action.sessions).length === 0;
      periods = isEmpty ? [] : createSet(monthsFromObject(action.sessions));
      current = isEmpty ? [] : setCurrentPeriodByMonth(periods);
      sessions = isEmpty ? [] : filterSessionsByMonth(objectToArray(action.sessions), current);
      return { 
        ...state, 
        periods: periods, 
        current: current, 
        sessionsByPeriod: sortBy(sessions, 'session_date'),
        weeks: createSet(weeksFromArray(sessions)),
      };

    case actionTypes.UPDATE_PERIODS: 
      isEmpty = action.sessions.length === 0;
      periods = isEmpty ? [] : createSet(monthsFromArray(action.sessions));
      current = isEmpty ? [] : setCurrentPeriodByMonth(periods);
      sessions = isEmpty ? [] : filterSessionsByMonth(action.sessions, current);
      return { 
        ...state, 
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
        sessionsByWeek: [],
        weekFilteredBy: null
      };

    case actionTypes.HANDLE_PERIOD_SELECT_WEEK: 
      sessions = filterSessionsByWeek(action.sessions, action.week);
      return { 
        ...state, 
        sessionsByWeek: sessions,
        weekFilteredBy: action.week
      };

    case actionTypes.REMOVE_WEEKLY_FILTERS: 
      return { 
        ...state, 
        sessionsByWeek: [],
        weekFilteredBy: null
      };

    default:
      return state;  
  }
}

export default reducer;