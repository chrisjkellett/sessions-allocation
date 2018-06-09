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
      group: 'personal + roles',
      validation: constructValidation({...rules.required, ...rules.minLength})
      },

    email: {
      elementType: 'input',
      elementConfig: {
        type: 'text'
      },
      value: '',
      group: 'personal + roles',
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
      group: 'personal + roles',
      validation: constructValidation({...rules.required})
    },

    id_number: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        maxLength: 6,
        disabled: true
      },
      hide: true,
      value: '',
      group: 'personal + roles',
      validation: constructValidation({...rules.required, ...rules.checkId})
    },

    levels: {
      elementType: 'checkbox',
      options: levelKeys,
      elementConfig: {
        disabled: true
      },
      hide: true,
      value: [],
      group: 'personal + roles',
      validation: constructValidation({...rules.required})
    },
    
    availability: {
      elementType: 'select',
      elementConfig: {
        multiple: true,
        size: availabilityKeys.length
      },
      options: availabilityKeys,
      value: [],
      group: 'availability + monitoring',
      validation: constructValidation({...rules.required})
    },

    last_monitoring: {
      elementType: 'date',
      options: {
        days: dayOptions,
        months: monthOptions,
        years: yearOptionsMonitoring
      },
      elementConfig: {
        disabled: true
      },
      hide: true,
      value: ['2018', 'June', '13'],
      group: 'availability + monitoring',
      validation: constructValidation({})
    },

    monitoring_level: {
      elementType: 'checkbox',
      options: levelKeys,
      elementConfig: {
        disabled: true
      },
      hide: true,
      value: [],
      group: 'availability + monitoring',
      validation: constructValidation({})
    },
  } 
}