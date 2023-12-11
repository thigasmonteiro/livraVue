import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const api = axios.create({
  baseURL: 'https://livrarianova-dev-bpmr.2.us-1.fl0.io/'
})

api.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  const { token } = authStore
  console.log(token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api