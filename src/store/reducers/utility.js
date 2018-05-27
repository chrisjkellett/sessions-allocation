export const updateState = (obj, update) => {
  return{
    ...obj,
    ...update
  }
}

export const sortByName = (obj) => {
  return obj.sort((a, b) =>{
    return a.name > b.name
  })
}