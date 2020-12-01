import Vue from 'vue'
import Router from 'vue-router'
import Overview from './../components/Overview.vue'
import Profile from './../components/Profile.vue'
import Signup from './../components/auth/Signup'
import Login from './../components/auth/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Overview',
      component: Overview
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ]
})
