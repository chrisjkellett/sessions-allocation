
export const examinerTableHeaders = [
  'examiner name',
  'roles',
  'levels',
  'availability',
  null
]

export const isPm = (day) => {
  if(day.substring(day.length - 2, day.length) === 'pm'){
    return 'pm';
  }

  if(day.substring(day.length - 2, day.length) === 'am'){
    return 'am';
  }
}


export const formatURL = (str) => {
  return str.toLowerCase().replace(" ", "");
}


