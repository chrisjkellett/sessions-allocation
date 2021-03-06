import {constructValidation} from './validation';

export const constructAuthState = () => {
  return {
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'text'
      },
      value: '',
      validation: constructValidation({})
      },

    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password'
      },
      value: '',
      validation: constructValidation({})
      }
  }
}