export const checkValidity = (obj) => {
  const {validation, value} = obj;
  const {rules} = validation;
  let errors = [];

  if(rules.required && value.length === 0) errors.push(rules.required);

  if(rules.minLength && value.length < 6) errors.push(formatLengthError(rules.minLength, 6))

  if(rules.validId && invalidID(value)) errors.push(rules.validId)

  if(rules.checkDate && invalidDate(value)) errors.push(rules.checkDate)

  validation.valid = errors;
    
  return validation;
}

const formatLengthError = (rule, num) => {
  return rule.replace(/#/g, num)
}

const invalidID = (id) => {
  return !/[a-m][a-m][0-9][0-9][a-m][a-m]/i.test(id.trim())
}

const invalidDate = (arr) => {
  console.log(arr);
  return false;
}