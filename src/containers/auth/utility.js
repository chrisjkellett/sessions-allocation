export const generateInputProps = (element, state, inputHandler) => {
  const {config} = element;
  return {
    key: element.id,
    label: element.id,
    elementtype: config.elementType,
    elementConfig: config.elementConfig,
    value: config.value,
    valid: config.validation.valid,
    shouldValidate: state.shouldValidate,
    change: (event) => inputHandler(event, element.id)
  }
}

export const formatError = (error) => {
  switch(error){
    case 'INVALID_EMAIL':
      return 'invalid username and password combination';
    default:
      return error;
  }
}