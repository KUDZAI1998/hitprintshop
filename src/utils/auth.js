import axios from '@/utils/axios'
import jwt from 'jsonwebtoken'

import store from '@/store'
import * as type from '@/store/mutation-types'

const TOKEN_OBJECT_KEY = 'token_object'
const ACCESS_TOKEN_KEY = 'access_token'
const USER_PROFILE_KEY = 'user_profile'

export const login = ({ username, password, accountType }) => axios.post(
  '/auth/signin', {
    username,
    password,
    accountType
  }
)

export function logout (to, from, next) {
  clearAccessToken()
  clearUserProfile()
  clearTokenObject()
  next({ path: '/' })
}

export function requireAuth (to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: '/signin',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

// Get and store access_token in local storage
export function setAccessToken (accessToken) {
  store.commit(type.LOGIN)
  // let accessToken = getParameterByName('access_token')
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
}

export function getAccessToken () {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

function clearAccessToken () {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  store.commit(type.LOGOUT)
}

export function getTokenObject () {
  return JSON.parse(localStorage.getItem(TOKEN_OBJECT_KEY))
}

// Get and store access_token in local storage
export function setTokenObject (tokenObject) {
  store.commit(type.LOGIN)
  // let accessToken = getParameterByName('access_token')
  localStorage.setItem(TOKEN_OBJECT_KEY, JSON.stringify(tokenObject))
}

function clearTokenObject () {
  localStorage.removeItem(TOKEN_OBJECT_KEY)
  store.commit(type.LOGOUT)
}
// Get and store access_token in local storage
export function setUserProfile (user) {
  store.commit(type.SET_USER_PROFILE, user)
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(user))
}

export function getUserProfile () {
  return JSON.parse(localStorage.getItem(USER_PROFILE_KEY))
}

function clearUserProfile () {
  localStorage.removeItem(USER_PROFILE_KEY)
  store.commit(type.CLEAR_USER_PROFILE)
}
/* Helper function that will allow us to extract the access_token and id_token
function getParameterByName (name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash)
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
} */

export function isLoggedIn () {
  const acccessToken = getAccessToken()
  return !!acccessToken && !isTokenExpired(acccessToken)
}

function getTokenExpirationDate (encodedToken) {
  const token = jwt.decode(encodedToken)
  if (!token) return null
  if (!token.exp) return null

  const date = new Date(0)
  date.setUTCSeconds(token.exp)
  return date
}

function isTokenExpired (token) {
  const expirationDate = getTokenExpirationDate(token)
  return expirationDate < new Date()
}
