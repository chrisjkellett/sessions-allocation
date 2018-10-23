import {
  roleKeys, levelKeys, availabilityKeys, dayOptions, monthOptions
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
        disabled: false
      },
      value: '',
      group: 1,
      validation: constructValidation({...rules.required, ...rules.minLength})
      },

    email: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        disabled: false,
      },
      value: '',
      group: 1,
      validation: constructValidation({...rules.required, ...rules.checkEmail})
      },

    date_of_birth: {
      elementType: 'date',
      options: {
        days: dayOptions,
        months: monthOptions,
        years: Array.from(new Array(51),(val, index) => index + 1950)
      },
      elementConfig: {
        disabled: false
      },
      value: [1985, monthOptions[0].id, dayOptions[0].id],
      group: 1,
      validation: constructValidation({...rules.checkDate})
    },

    roles: {
      elementType: 'select',
      elementConfig: {
        multiple: true,
        size: roleKeys.length,
        disabled: false,
      },
      options: roleKeys,
      value: [],
      group: 1,
      validation: constructValidation({...rules.required})
    },

    id_number: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        maxLength: 6,
        disabled: false,
      },
      value: '',
      group: 1,
      validation: constructValidation({...rules.checkId})
    },

    levels: {
      elementType: 'checkbox',
      options: levelKeys,
      elementConfig: {
        disabled: false
      },
      value: [],
      group: 1,
      validation: constructValidation({})
    },
    
    availability: {
      elementType: 'select',
      elementConfig: {
        multiple: true,
        size: availabilityKeys.length,
        disabled: false,
      },
      options: availabilityKeys,
      value: [],
      group: 2,
      validation: constructValidation({...rules.required})
    },

    status: {
      elementType: 'select',
      options: ['active', 'suspended'],
      elementConfig: {
        disabled: false
      },
      value: 'active',
      group: 2,
      validation: constructValidation({})
    },
    
  } 
};