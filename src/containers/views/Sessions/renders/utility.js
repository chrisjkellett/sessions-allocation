export const generateInputProps = (element, periodHandler) => {
  const {config} = element;
  return {
    key: element.id,
    label: element.id,
    elementtype: config.elementType,
    elementConfig: config.elementConfig,
    value: config.value,
    valid: [],
    change: (event) => periodHandler(event, element.id)
  }
}