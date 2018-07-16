export const filterForUser = (examiners, user, isAuthenticated) => {
  if(isAuthenticated)
    return examiners;
  else  
    return examiners.filter(e => e.name === user)
}