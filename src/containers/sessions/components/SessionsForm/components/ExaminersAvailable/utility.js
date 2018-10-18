export const getPairNumber = (index) => {
  const divided = index/2;
  if(index === -1 )
    return null
  else
    return Number.isInteger(divided) ? divided + 1 : Math.round(divided);
}