export const capitaliseFirstLetter = (str) => {
  return str.replace(/\b\w/g, l => l.toUpperCase());
}

export const getSelectedOptions = (event) => {
  return [...event.target.options]
      .filter(({selected}) => selected)
      .map(({value}) => value);
}