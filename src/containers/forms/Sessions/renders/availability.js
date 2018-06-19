export const checkType = (examiner, sessionType) => {
  switch (sessionType){
    case 'Speaking':
      return examiner.roles.includes('Speaking Examiner');
    case 'Writing':
      return examiner.roles.includes('Supervisor');
    default:
      return true;  
  }
}

export const checkLevels = (examiner, sessionLevels) => {
  return sessionLevels.every(level => examiner.levels.includes(level));
}

