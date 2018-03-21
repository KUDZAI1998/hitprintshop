import axios from 'axios'

export const baseURL = process.env.NODE_ENV === 'production' ? `https://hit-connect.now.sh/v1` : 'http://localhost:3000/v1'

const instance = axios.create({ baseURL })

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default instance
