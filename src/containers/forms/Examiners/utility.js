export const capitaliseFirstLetter = (str) => {
  return str.replace(/\b\w/g, l => l.toUpperCase());
}