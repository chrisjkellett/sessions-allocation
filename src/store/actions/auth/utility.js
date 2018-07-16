export const setStorage = ({idToken, expiresIn}) => {
  const expiration = new Date(new Date().getTime() + expiresIn * 1000);
  localStorage.setItem('token', idToken)
  localStorage.setItem('expiration', expiration);
}