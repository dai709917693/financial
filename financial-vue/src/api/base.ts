import router from '@/router'
import axios from 'axios'

let token = sessionStorage.getItem('token')

export function updateToken(val: string) {
  token = val
  sessionStorage.setItem('token', val)
}

export const instance = axios.create({
  baseURL: 'http://localhost:3000/'
})

instance.interceptors.request.use(
  function (config) {
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    return { ...response.data, state: true } as any
  },
  function (error) {
    if (error.response.status === 401) {
      router.push({ name: 'login' })
    }
    console.log(error)
    return Promise.resolve({
      state: false,
      message: error.response.data.message
    })
  }
)
