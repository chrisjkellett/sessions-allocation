import {
  constructValidation,
  rules
} from './validation';

export const constructVenuesState = () => {
  return {
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text'
      },
      value: '',
      group: 'left',
      validation: constructValidation({...rules.required})
      },

      address: {
        elementType: 'input',
        elementConfig: {
          type: 'text'
        },
        value: '',
        group: 'left',
        validation: constructValidation({...rules.required})
        },
      
      type: {
          elementType: 'select',
          elementConfig: {
            multiple: false
          },
          options: ['Speaking', 'Writing'],
          value: 'Speaking',
          group: 'right',
          validation: constructValidation({})
        },

      city: {
        elementType: 'select',
        elementConfig: {
          multiple: false
        },
        options: ['Valencia', 'Murcia'],
        value: 'Valencia',
        group: 'right',
        validation: constructValidation({})
        },

      phone: {
          elementType: 'input',
          elementConfig: {
            type: 'text'
          },
          value: '',
          group: 'left',
          validation: constructValidation({...rules.required})
          },

  } 
}

export default constructVenuesState;