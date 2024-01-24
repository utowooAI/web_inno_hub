import axios from 'axios';

const API_URL = '/api/users/';

const register = (email, password) => {
  return axios.post(API_URL + 'register', {
    email,
    password
  });
};

const login = (email, password) => {
  return axios.post(API_URL + 'login', {
    email,
    password
  }, {
    headers: {
      'X-Tenant-ID': tenantId
    }
  }).then((response) => {
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  });
};

const authService = {
  register,
  login
  // ...可以添加更多的认证相关方法
};

export default authService;
