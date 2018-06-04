export const constructValidation = (rules) => {
  return {
    valid: [],
    rules: rules
  }
}

export const rules = {
  required: {required: 'required field'},
  minLength: {minLength: 'must contain x characters'}
}