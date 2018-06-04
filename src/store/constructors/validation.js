export const constructValidation = (rules) => {
  
  return {
    valid: distributeInitialErrors(rules),
    rules: rules
  }
}

export const rules = {
  required: {required: 'required field'},
  minLength: {minLength: 'min # characters'},
  validId: {validId: 'incorrect format'},
  checkDate: {checkDate: 'invalid date'}
}

export const distributeInitialErrors = (rules) => {
  let arr = [];
  for (let item in rules){
    arr.push(rules[item]);
  };
  return arr;
}