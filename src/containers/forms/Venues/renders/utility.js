export const generateInputProps = (element, state, changeHandler) => {
  const {config} = element
    return {
      key: element.id,
      label: element.id,
      options: config.options,
      elementtype: config.elementType,
      elementConfig: config.elementConfig,
      value: config.value,
      valid: config.validation.valid,
      shouldValidate: state.shouldValidate,
      change: (event, index) => changeHandler(event, config.elementType, element.id, index)
    }
}
