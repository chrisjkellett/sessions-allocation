export const objectToArray = (obj, keys) => {
  const copy = {...obj};

  const levels = keys.filter(item => {
    return copy[item];
  })
  
  return levels;
}
