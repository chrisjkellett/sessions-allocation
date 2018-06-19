import {constructValidation} from './validation';

export const constructPeriodState = () => {
  return {
    elementType: 'select',
    options: ['April', 'May'],
    elementConfig: {
      disabled: false
    },
    value: [],
    validation: constructValidation({})
  }
}