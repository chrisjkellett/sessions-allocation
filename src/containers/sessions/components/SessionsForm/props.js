export const generateInputProps = (element, shouldValidate, { change }, venues) => {
  const {config} = element
  return {
    key: element.id,
    label: element.id,
    options: hasAsyncOptions(config.options, venues.map(v => v.name)),
    elementtype: config.elementType,
    elementConfig: config.elementConfig,
    value: hasAsyncOptions(config.value, venues[0].name),
    hide: config.hide,
    valid: config.validation.valid,
    shouldValidate: shouldValidate,
    change: (event, index) => change(event, config.elementType, element.id, index)
  }
}

const hasAsyncOptions = (options, payload) => {
  return options === null ? payload : options 
}
