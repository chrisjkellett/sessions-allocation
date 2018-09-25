export const generateFormElementArray = (obj) => {
  let formElementArray = [];

  for(let key in obj){
    formElementArray.push({
      id: key,
      config: obj[key]
    })
  }

  return formElementArray;
}

export const generateInputProps = (element, shouldValidate, { change }) => {
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
      change: (event, index) => change(event, config.elementType, element.id, index)
    }
}
