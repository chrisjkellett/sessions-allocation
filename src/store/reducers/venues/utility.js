export const sortByName = (array) => {
  return array.sort((a, b) =>{
    return a['name'].toLowerCase() > b['name'].toLowerCase()
  })
}