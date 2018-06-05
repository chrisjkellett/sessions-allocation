export const objectToArray = (obj) => {
    const copy = {
      ...obj
    }

    const keys = Object.keys(copy);

    const array = keys.map(item =>{
      copy[item].id = item;
      return copy[item]
    });

    return sortByName(array);
}

export const sortByName = (obj) => {
  return obj.sort((a, b) =>{
    return a.name > b.name
  })
}
