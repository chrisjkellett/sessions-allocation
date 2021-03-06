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

  record.id = id;

  const updated = filtered.concat(record);

  return updated;
}

export const addId = (obj, id) => {
  obj.id = id;
  return obj;
}

export const isValidUser = (examiners, attempt) => {
  const result = examiners.find(examiner => {
    return examiner.email === attempt.email && attempt.password === 'test';
  })
  return result !== undefined ? result : 'not found';
}

export const checkIfAdmin = (user) => {
  if(user === null || user === 'not found')
    return false; 
  else  
    return user.roles.includes('Team Leader');
}

export const Availability = () => {
  return{
    failsAvailability: false,
    failsLevel: false,
    failsRoles: false,
    failsIsBusy: false,
    failsIsSupport: false,
    failsIsExaminer: false,
    failsIsActive: false,
  }
}

export const objectToArray = (obj, isExaminers) => {
  const keys = Object.keys(obj);

  const array = keys.map(item =>{
    if(isExaminers){
      obj[item].avail = Availability();
      obj[item].available = true;
    } 
    return obj[item]
  });

  return array;
}

export const sortBy = (obj, factor = 'name') => {
  return obj.sort((a, b) =>{
    return a[factor] > b[factor]
  })
}

export const checkExaminerOnLoad = ({user, examiners}) => {
  return user ? objectToArray(examiners).find(e => e.name === user) : null;
};

export const filterData = (data, { value, filterBy }) => {
  return value.length === 0 
  ? null 
  : typeof data[0][filterBy] === 'string'
    ? filterAsString(data, value, filterBy)
    : data[0][filterBy][0].name === undefined
      ? filterAsArray(data, value, filterBy)
      : filterAsArrayOfObjects(data, value, filterBy)
}

const filterAsString = (data, value, filterBy) => {
  return data.filter(record => 
    record[filterBy].substring(0, value.length).toLowerCase() === value.toLowerCase())
};

const filterAsArray = (data, value, filterBy) => {
  return data.filter(record => 
    record[filterBy] !== undefined && record[filterBy].some(item => 
        item.substring(0, value.length).toLowerCase() === value.toLowerCase()
      )
    );
};

const filterAsArrayOfObjects = (data, value, filterBy) => {
  return data.filter(record => 
    record[filterBy] !== undefined && record[filterBy].some(item => 
        item.name.substring(0, value.length).toLowerCase() === value.toLowerCase()
      )
    );
}
