// import {
//   roleKeys, levelKeys, availabilityKeys, dayOptions, monthOptions, yearOptionsMonitoring
// } from '../data';

import {
  constructValidation,
  rules
} from './validation';

export const constructExaminerState = () => {
  return {
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: ''
      },
      value: '',
      validation: constructValidation({...rules.required, ...rules.minLength})
      }

  //   roles: {
  //     elementType: 'select',
  //     elementConfig: {
  //       multiple: true,
  //       size: roleKeys.length
  //     },
  //     options: roleKeys,
  //     value: []
  //   },

  //   id_number: {
  //     elementType: 'input',
  //     elementConfig: {
  //       type: 'text',
  //       placeholder: '',
  //       maxLength: 6
  //     },
  //     value: ''
  //   },

  //   levels: {
  //     elementType: 'checkbox',
  //     elementConfig: {
  //       placeholder: ''
  //     },
  //     options: levelKeys,
  //     value: []
  //   },
    
  //   availability: {
  //     elementType: 'select',
  //     elementConfig: {
  //       multiple: true,
  //       size: availabilityKeys.length
  //     },
  //     options: availabilityKeys,
  //     value: []
  //   },

  //   last_monitoring: {
  //     elementType: 'date',
  //     options: {
  //       days: dayOptions,
  //       months: monthOptions,
  //       years: yearOptionsMonitoring
  //     },
  //     value: ['2018', 'January', '10']
  //   }
  } 
}