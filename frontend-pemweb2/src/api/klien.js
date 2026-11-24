import axios from 'axios'

// Ubah menjadi 'fiber' atau 'laravel' untuk berpindah backend
export const MODE_BACKEND = 'fiber'

const baseURL =
  MODE_BACKEND === 'fiber'
    ? import.meta.env.VITE_API_FIBER
    : import.meta.env.VITE_API_LARAVEL

const klien = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

klien.interceptors.request.use((konfigurasi) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    konfigurasi.headers.Authorization = `Bearer ${token}`
  }
  return konfigurasi
})

klien.interceptors.response.use(
  (respons) => respons,
  (galat) => {
    if (galat.response && galat.response.status === 401) {
      sessionStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(galat)
  }
)

export default klien