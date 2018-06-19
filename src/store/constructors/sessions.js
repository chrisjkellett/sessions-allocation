import {
  dayOptions, monthOptions, yearOptions, sessionTypeKeys, venueKeys, timeKeys, levelKeys
} from '../data';

import {
  CURRENTYEAR, CURRENTMONTH, CURRENTDAY
} from '../data';

import {
  constructValidation,
  rules
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
      value: [CURRENTYEAR, monthOptions[CURRENTMONTH - 1].m, CURRENTDAY],
      group: 'session-data',
      validation: constructValidation({})
    },

    time: {
      elementType: 'select',
      elementConfig: {
        multiple: false,
        disabled: false
      },
      options: timeKeys,
      value: timeKeys[0],
      group: 'session-data',
      validation: constructValidation({})
    },

    type: {
      elementType: 'select',
      elementConfig: {
        multiple: false,
        disabled: false
      },
      options: sessionTypeKeys,
      value: sessionTypeKeys[0],
      group: 'session-data',
      validation: constructValidation({})
    },

    venue: {
      elementType: 'select',
      elementConfig: {
        multiple: false,
         disabled: false
      },
      options: venueKeys,
      value: '',
      group: 'session-data',
      validation: constructValidation({...rules.required})
    },

    levels: {
      elementType: 'checkbox',
      options: levelKeys,
      elementConfig: {
         disabled: false
      },
      value: [],
      group: 'session-data',
      validation: constructValidation({...rules.required})
    },

    examiners: {
      elementType: 'select',
      elementConfig: {
        multiple: true,
        disabled: false
      },
      options: [],
      value: [],
      group: 'session-data',
      validation: constructValidation({})
    },

    support: {
      elementType: 'select',
      elementConfig: {
        multiple: true,
        disabled: false
      },
      options: [],
      value: [],
      group: 'session-data',
      validation: constructValidation({})
    }

  } 
}

export default constructSessionsState;