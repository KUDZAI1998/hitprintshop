import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/Login'
import JoinUs from '@/pages/JoinUs'
import Timeline from '@/pages/Timeline'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/join-us',
      name: 'JoinUs',
      component: JoinUs
    },
    {
      path: '/timeline',
      name: 'Timeline',
      component: Timeline
    }
  ]
})
