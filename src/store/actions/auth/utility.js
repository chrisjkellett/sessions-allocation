export const setStorage = ({idToken, expiresIn, email}, name) => {
  const expiration = new Date(new Date().getTime() + expiresIn * 1000);
  localStorage.setItem('token', idToken)
  localStorage.setItem('expiration', expiration);
  email && localStorage.setItem('email', email);
  name && localStorage.setItem('name', name);
}

export const deleteStorage = () => {
  localStorage.clear();

}

export const getStorage = () => {
  return{
    token: localStorage.getItem('token'),
    expiration: localStorage.getItem('expiration'),
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email')
  }
}

export const checkTokenValidity = ({expiration}) => {
  return new Date(expiration) > new Date() ? true : false
}