import axios from 'axios';
const API_URL = process.env.REACT_APP_BASE_URL
function getToken() {
  const data = localStorage && localStorage.getItem('token');
  return data; 
}
let Api = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  }
});

Api.interceptors.request.use(
  async (config) => {
      const token = getToken();
      if (token !== null) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config; 
  },
  (error) => {
      return Promise.reject(error);
  }
);

export default Api;