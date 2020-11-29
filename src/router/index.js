import Vue from 'vue'
import Router from 'vue-router'
import Overview from './../components/Overview.vue'
import Profile from './../components/Profile.vue'

Vue.use(Router)

let routes = [
  {
    path: '/',
    name: 'Overview',
    component: Overview
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]

const router = new Router({
  mode: 'history',
  routes
})

export default router
