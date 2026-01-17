import axios from 'axios'
import { toast } from 'vue-sonner'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Error de conexión con el servidor'

    toast.error('Error', { description: message })

    return Promise.reject(error)
  },
)

export default api
