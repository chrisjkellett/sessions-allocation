export const updateState = (obj, update) => {
  return{
    ...obj,
    ...update
  }
}