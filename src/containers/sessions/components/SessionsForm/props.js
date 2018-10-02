export const generateInputProps = (element, shouldValidate, { change }, venues) => {
  const {config} = element

  const payloadType = (id) => {
    switch(id){
      case 'venue':
        return venues.map(v => v.name);
      case 'examiners':
        return ['Mobbd', 'hdgh']
      case 'support':
        return ['Lola']
      default:
        return [];
    }
  }

  return {
    key: element.id,
    label: element.id,
    options: hasAsyncOptions(config.options, payloadType(element.id)),
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
