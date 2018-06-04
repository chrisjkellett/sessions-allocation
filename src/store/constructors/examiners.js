import {
  roleKeys, levelKeys, availabilityKeys, dayOptions, monthOptions, yearOptionsMonitoring
} from '../data';

import {
  constructValidation,
  rules
} from './validation';

export const constructExaminerState = () => {
  return {
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: ''
      },
      value: '',
      validation: constructValidation({...rules.required, ...rules.minLength})
      },

    roles: {
      elementType: 'select',
      elementConfig: {
        multiple: true,
        size: roleKeys.length
      },
      options: roleKeys,
      value: [],
      validation: constructValidation({...rules.required})
    },

    id_number: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: '',
        maxLength: 6
      },
      value: '',
      validation: constructValidation({...rules.required, ...rules.validId})
    },

    levels: {
      elementType: 'checkbox',
      elementConfig: {
        placeholder: ''
      },
      options: levelKeys,
      value: [],
      validation: constructValidation({})
    },
    
    availability: {
      elementType: 'select',
      elementConfig: {
        multiple: true,
        size: availabilityKeys.length
      },
      options: availabilityKeys,
      value: [],
      validation: constructValidation({...rules.required})
    },

    last_monitoring: {
      elementType: 'date',
      options: {
        days: dayOptions,
        months: monthOptions,
        years: yearOptionsMonitoring
      },
      value: ['2018', 'January', '10'],
      validation: constructValidation({...rules.checkDate})
    }
  } 
}