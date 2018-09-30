export const filterExaminer = (examiners, { value, filterBy }) => {
  return value.length === 0 
  ? null 
  : filterBy === 'name' 
    ? filterAsString(examiners, value, filterBy)
    : filterAsArray(examiners, value, filterBy);
}

const filterAsString = (examiners, value, filterBy) => {
  return examiners.filter(examiner => 
    examiner[filterBy].substring(0, value.length).toLowerCase() === value.toLowerCase())
};

const filterAsArray = (examiners, value, filterBy) => {
  return examiners.filter(examiner => 
    examiner[filterBy] !== undefined && examiner[filterBy].some(item => 
        item.substring(0, value.length).toLowerCase() === value.toLowerCase()
      )
    );
};