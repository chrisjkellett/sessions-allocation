export const objectToArray = (obj) => {
    const copy = {
      ...obj
    }

    const keys = Object.keys(copy);

    const array = keys.map(item =>{
      copy.id = item;
      return copy[item]
    }).sort((a, b) =>{
      return a.name > b.name
    });

    return array;
}