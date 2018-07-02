export const formatURL = (str) => {
  return str.toLowerCase().replace(" ", "");
}

export const formatDateURL = (arr) => {
  delete arr[0];
  return arr.join("");
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