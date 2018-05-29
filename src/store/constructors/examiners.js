import {roleKeys, levelKeys, availabilityKeys} from '../data';

export const constructExaminerState = () => {
  return {
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: ''
      },
      value: ''
    },

    roles: {
      elementType: 'select',
      elementConfig: {
        multiple: true
      },
      options: roleKeys,
      value: []
    },

    id_number: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: ''
      },
      value: ''
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
        multiple: true
      },
      options: availabilityKeys,
      value: []
    },
  } 
}