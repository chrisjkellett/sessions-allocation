export const formatURL = (str) => {
  return str.toLowerCase().replace(" ", "");
}

export const generateFormElementArray = (formObj) => {
  let formElementArray = [];

  for(let key in formObj){
    formElementArray.push({
      id: key,
      config: formObj[key]
    })
  }

  return formElementArray;
}