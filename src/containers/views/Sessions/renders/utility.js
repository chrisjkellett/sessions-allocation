export const generateInputProps = (element, periodHandler, periods) => {
  const {config} = element;
  return {
    key: element.id,
    label: element.id,
    options: periods,
    elementtype: config.period.elementType,
    elementConfig: config.period.elementConfig,
    value: config.period.value,
    valid: [],
    change: (event) => periodHandler(event, element.id)
  }
}