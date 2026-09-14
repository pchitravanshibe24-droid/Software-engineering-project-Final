import axios from 'axios'

// With Vite proxy configured, use relative /api path
// Vite forwards /api/* → http://localhost:8080/api/*
const api = axios.create({
  baseURL: '/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
