import {
  dayOptions, monthOptions, yearOptions, sessionTypeKeys, venueKeys, timeKeys, levelKeys
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

    time: {
      elementType: 'select',
      elementConfig: {
        multiple: false
      },
      options: timeKeys,
      value: timeKeys[0],
      group: 'session-data',
      validation: constructValidation({})
    },

    type: {
      elementType: 'select',
      elementConfig: {
        multiple: false
      },
      options: sessionTypeKeys,
      value: sessionTypeKeys[0],
      group: 'session-data',
      validation: constructValidation({})
    },

    venue: {
      elementType: 'select',
      elementConfig: {
        multiple: false
      },
      options: venueKeys,
      value: '',
      group: 'session-data',
      validation: constructValidation({})
    },

    levels: {
      elementType: 'checkbox',
      options: levelKeys,
      value: [],
      group: 'session-data',
      validation: constructValidation({})
    },

    examiners: {
      elementType: 'select',
      elementConfig: {
        multiple: true
      },
      options: [],
      value: [],
      group: 'session-data',
      validation: constructValidation({})
    },

    support: {
      elementType: 'select',
      elementConfig: {
        multiple: true
      },
      options: [],
      value: [],
      group: 'session-data',
      validation: constructValidation({})
    }

  } 
}

export default constructSessionsState;