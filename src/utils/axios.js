import axios from 'axios'

export const baseURL = process.env.NODE_ENV === 'production' ? 'https://hitprintshop.herokuapp.com' : 'https://hitprintshop.herokuapp.com'

const instance = axios.create({ baseURL })

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default instance
