export const checkValidity = (obj) => {
  let errors = [];

  if(obj.validation.rules.required){
    if(obj.value.trim().length === 0){
      errors.push('required field');
    }
  }

  if(obj.validation.rules.minLength){
    if(obj.value.trim().length < 6){
      errors.push('must contain 6 characters minimum')
    } 
  }

  obj.validation.valid = errors;
    
  return obj.validation;
}