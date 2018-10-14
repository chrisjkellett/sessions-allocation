export const generateInputProps = (element, shouldValidate, { change }, i) => {
  const {config} = element
    return {
      key: element.id,
      label: element.id,
      options: config.options,
      elementtype: config.elementType,
      elementConfig: config.elementConfig,
      value: config.value,
      valid: config.validation.valid,
      shouldValidate: shouldValidate,
      change: (event, index) => change(event, config.elementType, element.id, index),
    }
};