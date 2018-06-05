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
        type: 'text'
      },
      value: '',
      group: 'personal',
      validation: constructValidation({...rules.required, ...rules.minLength})
      },

    email: {
      elementType: 'input',
      elementConfig: {
        type: 'text'
      },
      value: '',
      group: 'personal',
      validation: constructValidation({...rules.required, ...rules.checkEmail})
      },

    roles: {
      elementType: 'select',
      elementConfig: {
        multiple: true,
        size: roleKeys.length
      },
      options: roleKeys,
      value: [],
      group: 'roles',
      validation: constructValidation({...rules.required})
    },

    id_number: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        maxLength: 6
      },
      hide: true,
      value: '',
      group: 'roles',
      validation: constructValidation({...rules.required, ...rules.checkId})
    },

    levels: {
      elementType: 'checkbox',
      options: levelKeys,
      hide: true,
      value: [],
      group: 'roles',
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
      group: 'availability',
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
      group: 'monitoring',
      validation: constructValidation({...rules.checkDate})
    }
  } 
}