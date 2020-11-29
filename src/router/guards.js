import { isLoggedIn } from '../utils/auth'

export function authenticate () {
  if (isLoggedIn()) {
    return true
  } else {
    return false
  }
}
