
export const objectToArray = (obj, keys) => {
  const copy = {...obj};

  const levels = keys.filter(item => {
    return copy[item];
  })
  
  return levels;
}

export const abbreviateDays = (day) => {
  if(day.substring(day.length - 2, day.length) === 'pm')
    return day.substring(0, 3) + ' pm';
  else
    return day.substring(0, 3);
}

export const formatAvailability = (days) => {
  console.log(days)
  return days;
}
