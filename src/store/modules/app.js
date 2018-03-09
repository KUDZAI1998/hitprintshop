import * as type from '../mutation-types'
import { isLoggedIn, getUserProfile } from '../../utils/auth'

const state = {
  isLoggedIn: false,
  authUser: {}
}

const mutations = {
  [type.LOGOUT] (state) {
    state.isLoggedIn = false
  },
  [type.LOGIN] (state) {
    state.isLoggedIn = true
  },
  [type.CHECK_LOGIN_STATUS] (state) {
    state.isLoggedIn = isLoggedIn()
  },
  [type.SET_USER_PROFILE] (state, user) {
    state.authUser = user
  },
  [type.CLEAR_USER_PROFILE] (state) {
    state.authUser = {}
  },
  [type.CHECK_USER_PROFILE] (state) {
    state.authUser = getUserProfile()
  }
}

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  authUser: state => state.authUser
}

export default {
  state,
  mutations,
  getters
}
