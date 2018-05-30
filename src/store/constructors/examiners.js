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
        required: true
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
      validation: {
        required: true
      },
      valid: false
    },

    id_number: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: '',
        maxLength: 6
      },
      value: '',
      valid: true
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
      valid: false
    },
  } 
}