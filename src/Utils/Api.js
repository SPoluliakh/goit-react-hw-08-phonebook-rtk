import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

// Register
export const register = async credentials => {
  const response = await axios.post('/users/signup', credentials);
  setAuthHeader(response.data.token);
  return response.data;
};

// LogIn
export const login = async credentials => {
  const res = await axios.post('/users/login', credentials);
  setAuthHeader(res.data.token);
  return res.data;
};

// LogOut
export const logOut = async () => {
  await axios.post('/users/logout');
  clearAuthHeader();
};

// Refresh
export const refreshUser = async () => {
  const res = await axios.get('/users/current');
  return res.data;
};
