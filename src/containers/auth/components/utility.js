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
    case 'SERVER_ERROR':
      return 'no access to internet - please check your connection and refresh the page';
    default:
      return error;
  }
}