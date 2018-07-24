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
      value: [CURRENTYEAR, monthOptions[CURRENTMONTH - 1].id, dayOptions[CURRENTDAY - 1].id],
      group: 'session-data',
      validation: constructValidation({...rules.checkDate, ...rules.NotBeforeToday})
    },

    time: {
      elementType: 'select',
      elementConfig: {
        multiple: false,
        disabled: false
      },
      options: timeKeys.map(t => t.time),
      value: timeKeys[0].time,
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
      value: venueKeys[0],
      group: 'session-data',
      validation: constructValidation({})
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
      inline: true,
      value: [],
      group: 'session-data',
      validation: constructValidation({...rules.required})
    },

    support: {
      elementType: 'select',
      elementConfig: {
        multiple: true,
        disabled: false
      },
      options: [],
      inline: true,
      value: [],
      group: 'session-data',
      validation: constructValidation({...rules.required})
    },

    notes: {
      elementType: 'textarea',
      elementConfig: {
        disabled: false
      },
      value: '',
      group: 'session-data',
      validation: constructValidation({...rules.required})
    },

  } 
}

export default constructSessionsState;