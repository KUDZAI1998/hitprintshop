// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from '@/utils/axios'
import Toasted from 'vue-toasted'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(Toasted, {duration: 2000})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
