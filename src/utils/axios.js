import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://localhost:3000'
  baseURL: process.env.NODE_ENV === 'production' ? `https://${location.host}/v1` : 'http://localhost:3000/v1'
})

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default instance
