import axios from 'axios';

const api = axios.create({
  baseURL: 'https://docs.yossi-tikshoret.dev/',
  // ניתן להוסיף כאן הגדרות נוספות כמו headers, timeout וכו'
});

export default api;