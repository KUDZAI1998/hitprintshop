import { isLoggedIn } from '../utils/auth'
import router from './../router'

export function authenticate () {
  if (isLoggedIn()) {
    return true
  } else {
    return false
  }
}

export function isStudentAuthenticated () {
  if (!isLoggedIn()) {
    router.push({name: 'Login'})
  } else {
    router.push({name: 'Overview'})
  }
}
