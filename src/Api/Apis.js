import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL
console.log("baseUrl",BASE_URL)
let Api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default Api;