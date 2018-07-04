import {constructValidation} from './validation';
import {CURRENTMONTH_AS_STRING} from '../data';

export const constructPeriodState = () => {
  return {
    period:{
      elementType: 'select',
      elementConfig: {
        disabled: false
      },
      value: CURRENTMONTH_AS_STRING,
      validation: constructValidation({})
    }
  }
}


