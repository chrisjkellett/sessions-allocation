import {formatLengthError} from './utility';
import * as tests from './tests';

export const checkValidity = (obj) => {
  const {validation, value} = obj;
  const {rules} = validation;

  let errors = [];

  if(rules.required && value.length === 0) errors.push(rules.required);

  if(rules.minLength && value.length < 6) errors.push(formatLengthError(rules.minLength, 6))

  if(rules.checkId && tests.invalidID(value)) errors.push(rules.checkId)

  if(rules.checkDate && tests.invalidDate([...value])) errors.push(rules.checkDate);

  if(rules.checkEmail && tests.invalidEmail(value)) errors.push(rules.checkEmail);

  if(rules.NotBeforeToday && tests.NotBeforeToday([...value])) errors.push(rules.NotBeforeToday);

  validation.valid = errors;
    
  return validation;
}
