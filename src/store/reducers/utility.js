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
