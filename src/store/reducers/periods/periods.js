import * as actionTypes from '../../actions/actionTypes';
import {objectToSessionPeriods, setCurrentPeriod, filterSessionsByMonth} from './utility';
import {updateState, objectToArray} from '../utility';

const initialState = {
  periods: null,
  current: null,
  sessions_by_period: null
}

const reducer = (state = initialState, action) => {
  let periods, current, sessions;

  switch(action.type){
    case actionTypes.LOAD_PERIODS: 
      periods = objectToSessionPeriods(action.sessions);
      current = setCurrentPeriod(periods);
      sessions = filterSessionsByMonth(objectToArray(action.sessions), current);
      return updateState(state, {periods: periods, current: current, sessions_by_period: sessions});

    default:
      return state;  
  }
}

export default reducer;