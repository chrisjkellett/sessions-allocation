export const capitaliseFirstLetter = (str) => {
  return str.replace(/\b\w/g, l => l.toUpperCase());
}

export const getSelectedOptions = (event) => {
  return [...event.target.options]
      .filter(({selected}) => selected)
      .map(({value}) => value);
}

export const updateOptionArray = (options, event) => {
  if (event.target.checked) {
    options.push(event.target.id)
  }else{
    let index = options.indexOf(event.target.id)
    options.splice(index, 1)
  }
  return options;
}