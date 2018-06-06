
export const objectToArray = (obj, keys) => {
  const copy = {...obj};

  const levels = keys.filter(item => {
    return copy[item];
  })
  
  return levels;
}


export const isPm = (day) => {
  if(day.substring(day.length - 2, day.length) === 'pm'){
    return 'pm';
  }

  if(day.substring(day.length - 2, day.length) === 'am'){
    return 'am';
  }
}

