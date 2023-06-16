import axios from 'axios'
import { BACKEND_END_POINT } from '../utils/config'

const axiosInstance = axios.create({
  baseURL: BACKEND_END_POINT + '/api/v1',
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true
})

axiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data.data
  },
  (error) => {
    let errorMsg = 'Something went wrong. Please try again!'
    if (error?.response?.data?.errors && Array.isArray(error.response.data.errors) && error.response.data.errors.length) {  
      errorMsg = error.response.data.errors[0].description
    }
    return Promise.reject(errorMsg)
  }
)


export default axiosInstance