import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/Login'
import JwtCallback from '@/pages/JwtCallback'
import JoinUs from '@/pages/JoinUs'
import Timeline from '@/pages/Timeline'
import SellerProfile from '@/pages/SellerProfile'
import ProductDetails from '@/pages/ProductDetails'
import UploadProduct from '@/pages/UploadProduct'

import {logout} from '@/utils/auth'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/logout',
      beforeEnter: logout
    },
    {
      path: '/account',
      name: 'Account',
      component: SellerProfile
    },
    {
      path: '/auth/jwt/callback',
      name: 'JwtCallback',
      component: JwtCallback
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
    },
    {
      path: '/sellers/:username',
      name: 'SellerProfile',
      component: SellerProfile
    },
    {
      path: '/products/new',
      name: 'UploadProduct',
      component: UploadProduct
    },
    {
      path: '/products/:productId',
      name: 'ProductDetails',
      component: ProductDetails
    }
  ]
})
