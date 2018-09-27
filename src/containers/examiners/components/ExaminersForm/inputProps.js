export const generateInputProps = (element, state, { change }) => {
  const {config} = element
  return {
    key: element.id,
    label: element.id,
    options: config.options,
    elementtype: config.elementType,
    elementConfig: config.elementConfig,
    value: config.value,
    hide: config.hide,
    valid: config.validation.valid,
    shouldValidate: state.shouldValidate,
    change: (event, index) => change(event, config.elementType, element.id, index)
  }
}
