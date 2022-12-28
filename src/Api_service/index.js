import axios from 'axios'

const token = JSON.parse(localStorage.getItem('userInfo')).JWT ? JSON.parse(localStorage.getItem('userInfo')).JWT : ''

const devUrl = 'http://localhost:8000/v1/'
// const productionUrl = 'http://localhost:8000/v1/'

const instance = axios.create({
  baseURL: devUrl,
  timeout: 1000,
  headers: { Authorization: `Bearer ${token}` }
})

export default instance
