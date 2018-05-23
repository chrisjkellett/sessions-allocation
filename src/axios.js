import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://lvexams-ab54c.firebaseio.com/'
})

export default instance;