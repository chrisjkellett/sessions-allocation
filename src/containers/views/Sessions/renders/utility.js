export const generateInputProps = (element, periodHandler, props) => {
  const {config} = element;
  const {currentPeriod, sessionsByPeriod, periods} = props;
  return {
    key: element.id,
    label: element.id,
    sessionCount: sessionsByPeriod.length,
    options: periods,
    elementtype: config.period.elementType,
    elementConfig: config.period.elementConfig,
    value: currentPeriod,
    valid: [],
    change: (event) => periodHandler(event, element.id)
  }
}