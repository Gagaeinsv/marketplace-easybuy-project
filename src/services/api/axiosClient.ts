import axios from 'axios';

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL;
// If the environment variable on Vercel still has the deprecated onrender.com URL or is empty,
// automatically fall back to relative '/api', which Next.js rewrites securely to Oracle Cloud backend (http://89.168.115.138:8080/api)
const isDeprecatedRender = rawApiUrl && (rawApiUrl.includes('onrender.com') || rawApiUrl.includes('render.com'));

export const API_BASE_URL = (!rawApiUrl || isDeprecatedRender) ? '/api' : rawApiUrl;

axios.defaults.baseURL = API_BASE_URL;

export const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

export default axios;
