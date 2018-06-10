export const generateInputProps = (element, state) => {
  const {config} = element;
  return {
    key: element.id,
    label: element.id,
    elementtype: config.elementType,
    elementConfig: config.elementConfig,
    value: config.value,
    valid: config.validation.valid,
    shouldValidate: state.shouldValidate
  }
}