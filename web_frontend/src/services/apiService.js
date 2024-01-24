// src/services/apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // 你的后端API的基础URL

const getProtectedData = () => {
  const token = localStorage.getItem('token'); // 从localStorage中获取token
  return axios.get(`${API_URL}/protected`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export default {
  getProtectedData,
  // ...你可以导出其他API函数
};
