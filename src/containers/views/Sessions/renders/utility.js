export const generateInputProps = (element, periodHandler, props) => {
  const {config} = element;
  console.log(props.sessions);
  return {
    key: element.id,
    label: element.id,
    sessionCount: props.sessions.length,
    options: props.periods,
    elementtype: config.period.elementType,
    elementConfig: config.period.elementConfig,
    value: props.currentPeriod,
    valid: [],
    change: (event) => periodHandler(event, element.id)
  }
}