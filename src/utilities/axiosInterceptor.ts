import axios from 'axios'

const baseURL = 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
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
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
