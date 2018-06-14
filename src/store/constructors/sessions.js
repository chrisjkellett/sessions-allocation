import {
  dayOptions, monthOptions, yearOptions
} from '../data';

import {
  constructValidation,
  // rules
} from './validation';

export const constructSessionsState = () => {
  return {
    session_date: {
      elementType: 'date',
      options: {
        days: dayOptions,
        months: monthOptions,
        years: yearOptions
      },
      elementConfig: {
        disabled: false
      },
      value: ['2018', 'June', '13'],
      group: 'session-data',
      validation: constructValidation({})
    },
  } 
}

export default constructSessionsState;