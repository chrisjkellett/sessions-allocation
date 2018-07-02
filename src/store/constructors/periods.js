import {constructValidation} from './validation';

export const constructPeriodState = () => {
  return {
    period:{
      elementType: 'select',
      options: ['April', 'May'],
      elementConfig: {
        disabled: false
      },
      value: 'May',
      validation: constructValidation({})
    }
  }
}