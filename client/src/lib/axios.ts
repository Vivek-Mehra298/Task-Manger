import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Log the API URL being used (for debugging)
if (typeof window !== 'undefined') {
  console.log('🔗 API URL:', apiUrl);
}

const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    if (user) {
      const { token } = JSON.parse(user);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  }
  return config;
});

export default api;
