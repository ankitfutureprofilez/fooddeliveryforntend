import axios from 'axios';
const API_URL = process.env.REACT_APP_BASE_URL
function getToken() {
  const data = localStorage && localStorage.getItem('token');
  return data; 
}
//console.log("API_URL",API_URL)
let Api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
    'Access-Control-Allow-Origin': '*',
    "mode":"cors"
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