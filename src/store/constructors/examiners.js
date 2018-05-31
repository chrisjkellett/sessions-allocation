import {roleKeys, levelKeys, availabilityKeys} from '../data';

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
        required: {
          value: true, error: 'required field'
        }
      },
      valid: false,
      touched: false
    },

    roles: {
      elementType: 'select',
      elementConfig: {
        multiple: true,
        size: roleKeys.length
      },
      options: roleKeys,
      value: []
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
        required: {value: true, error: 'required field'},
        idCheck: {value: true, error: 'use proper format'}
      },
      valid: false,
      touched: false
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
      value: [],
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
  } 
}