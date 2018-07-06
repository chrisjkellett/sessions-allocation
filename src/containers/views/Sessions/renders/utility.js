export const generateInputProps = (element, periodHandler, periods, currentPeriod) => {
  const {config} = element;
  return {
    key: element.id,
    label: element.id,
    options: periods,
    elementtype: config.period.elementType,
    elementConfig: config.period.elementConfig,
    value: currentPeriod,
    valid: [],
    change: (event) => periodHandler(event, element.id)
  }
}