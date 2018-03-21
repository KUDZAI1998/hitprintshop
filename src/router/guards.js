import { isLoggedIn } from '../utils/auth'

export function authenticate (from, to, next) {
  console.log(from)
  console.log(to)
  if (isLoggedIn()) return next()
  next({
    path: '/login',
    query: {
      'return_url': to.path
    }
  })
}
