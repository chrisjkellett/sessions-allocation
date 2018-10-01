export const constructValidation = (rules) => {
  
  return {
    valid: distributeInitialErrors(rules),
    rules: rules
  }
}

export const rules = {
  required: {required: 'required field'},
  minLength: {minLength: 'min # characters'},
  checkId: {checkId: 'incorrect format'},
  checkDate: {checkDate: 'invalid date'},
  NotBeforeToday: {NotBeforeToday: 'cannot be a past date'},
  checkEmail: {checkEmail: 'not a valid email'},
  examinerNumber: {examinerNumber: 'select at least 2 examiners for main suite exams'}
}

export const distributeInitialErrors = (rules) => {
  let arr = [];
  for (let item in rules){
    item !== 'checkId' && arr.push(rules[item]);
  };
  return arr;
}