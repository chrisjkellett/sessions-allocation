export const updateState = (obj, update) => {
  return{
    ...obj,
    ...update
  }
}

export const removeElementById = (arr, id) => {
  return arr.filter(item => {
    return item.id !== id
  })
}

export const sortByName = (obj) => {
  return obj.sort((a, b) =>{
    return a.name > b.name
  })
}

export const findExaminer = (arr, id) => {
  const filtered = arr.find(item => {
    return item.name === id;
  })
  return filtered;
}

export const replaceElementById = (arr, record, id) => {
  const filtered = arr.filter(item => {
    return item.id !== id;
  })
  const updated = filtered.concat(record);

  return sortByName(updated);
}
