
export const objectToArray = (obj, keys) => {
  const copy = {...obj};

  const levels = keys.filter(item => {
    return copy[item];
  })
  
  return levels;
}


export const isPm = (day) => {
  return day.substring(day.length - 2, day.length) === 'pm';
}

