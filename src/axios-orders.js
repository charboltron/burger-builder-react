import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-b492d.firebaseio.com/'
});

export default instance;