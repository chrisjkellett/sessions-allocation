import {constructValidation} from './validation';

export const constructPeriodState = () => {
  return {
    period:{
      elementType: 'select',
      options: null,
      elementConfig: {
        disabled: false
      },
      value: 'May',
      validation: constructValidation({})
    }
  }
}