export const filterExaminerByName = (examiners, string) => {
  return string.length === 0 
  ? null 
  : examiners.filter(examiner => 
    examiner.name.substring(0, string.length).toLowerCase() === string.toLowerCase()
  );
}