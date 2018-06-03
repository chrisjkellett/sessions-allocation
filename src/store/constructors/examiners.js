import {
  roleKeys, levelKeys, availabilityKeys, dayOptions, monthOptions, yearOptionsMonitoring
} from '../data';

export const constructExaminerState = () => {
  return {
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: ''
      },
      value: '',
      validation: {
        required: true,
        idCheck: false
      },
      valid: false
    },

    roles: {
      elementType: 'select',
      elementConfig: {
        multiple: true,
        size: roleKeys.length
      },
      options: roleKeys,
      value: [],
      valid: true
    },

    id_number: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: '',
        maxLength: 6
      },
      value: '',
      validation: {
        required: true,
        idCheck: true
      },
      valid: false
    },

    levels: {
      elementType: 'checkbox',
      elementConfig: {
        placeholder: ''
      },
      options: levelKeys,
      value: []
    },
    
    availability: {
      elementType: 'select',
      elementConfig: {
        multiple: true,
        size: availabilityKeys.length
      },
      options: availabilityKeys,
      value: []
    },

    last_monitoring: {
      elementType: 'date',
      options: {
        days: dayOptions,
        months: monthOptions,
        years: yearOptionsMonitoring
      },
      value: ['2018', 'January', '10'],
      validation: {
        date: true,
        beforeNow: true
      },
      valid: false
    }
  } 
}