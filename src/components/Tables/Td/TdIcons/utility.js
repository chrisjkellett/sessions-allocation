export const isPm = (day) => {
  if(day.substring(day.length - 2, day.length) === 'pm'){
    return 'pm';
  }

  if(day.substring(day.length - 2, day.length) === 'am'){
    return 'am';
  }
}


export const formatAvailability = (arr) => {
  let newArr = [];
  const allpms = arr.filter(day =>{
    return day.substring(day.length -2, day.length) === 'pm'
  }).map(day=>{
    return day.substring(0, day.length - 3)
  });

  const allams = arr.filter(day =>{
    return day.substring(day.length -2, day.length) !== 'pm'
  });


  for(let item of arr){
    if(allpms.includes(item) && allams.includes(item)){
      newArr.push(item);
    }

    else if(!allpms.includes(item) && allams.includes(item)){
      newArr.push(item + ' am');
    }

    else if(allpms.includes(item.substring(0, item.length - 3)) && !allams.includes(item.substring(0, item.length - 3))){
      newArr.push(item);
    }
  }

  return newArr;
}