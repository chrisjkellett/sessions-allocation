import {
  roleKeys, levelKeys, availabilityKeys, dayOptions, monthOptions, yearOptionsMonitoring
} from '../data';

import {
  CURRENTYEAR, CURRENTMONTH, CURRENTDAY
} from '../data';


import {
  constructValidation,
  rules
} from './validation';

const ExaminerState = () => {
  return {
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        disabled: false
      },
      value: '',
      group: 1,
      validation: constructValidation({...rules.required, ...rules.minLength})
      },

    email: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        disabled: false,
      },
      value: '',
      group: 1,
      validation: constructValidation({...rules.required, ...rules.checkEmail})
      },

    roles: {
      elementType: 'select',
      elementConfig: {
        multiple: true,
        size: roleKeys.length,
        disabled: false,
      },
      options: roleKeys,
      value: [],
      group: 1,
      validation: constructValidation({...rules.required})
    },

    id_number: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        maxLength: 6,
        disabled: false,
      },
      value: '',
      group: 1,
      validation: constructValidation({...rules.checkId})
    },

    levels: {
      elementType: 'checkbox',
      options: levelKeys,
      elementConfig: {
        disabled: false
      },
      value: [],
      group: 1,
      validation: constructValidation({})
    },
    
    availability: {
      elementType: 'select',
      elementConfig: {
        multiple: true,
        size: availabilityKeys.length,
        disabled: false,
      },
      options: availabilityKeys,
      value: [],
      group: 2,
      validation: constructValidation({...rules.required})
    },

    last_monitoring: {
      elementType: 'date',
      options: {
        days: dayOptions,
        months: monthOptions,
        years: yearOptionsMonitoring
      },
      elementConfig: {
        disabled: false
      },
      value: ['2018', 'June', '13'],
      group: 2,
      validation: constructValidation({})
    },

    monitoring_level: {
      elementType: 'checkbox',
      options: levelKeys,
      elementConfig: {
        disabled: false
      },
      value: [],
      group: 2,
      validation: constructValidation({})
    },

    contract_start: {
      elementType: 'date',
      options: {
        days: dayOptions,
        months: monthOptions,
        years: yearOptionsMonitoring
      },
      elementConfig: {
        disabled: false
      },
      value: [CURRENTYEAR, monthOptions[CURRENTMONTH - 1].id, dayOptions[CURRENTDAY - 1].id],
      group: 3,
      validation: constructValidation({})
    },

    contract_end: {
      elementType: 'date',
      options: {
        days: dayOptions,
        months: monthOptions,
        years: yearOptionsMonitoring
      },
      elementConfig: {
        disabled: false
      },
      value: [CURRENTYEAR, monthOptions[CURRENTMONTH - 1].id, dayOptions[CURRENTDAY].id],
      group: 3,
      validation: constructValidation({})
    },
  } 
};

export default ExaminerState;