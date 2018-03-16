<template>
  <v-app>
    
    <v-navigation-drawer    v-model="drawer" app class="elevation-1">
    <div style="width: 100%; height: 200px;" class="primary white--text pa-3">
      <p>Profile info comes here</p>
    </div>
    <v-list class="pt-0" dense>
      <hr>
      <v-list-tile v-for="item in items" :key="item.title" @click="$router.push(item.url)">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
    <v-toolbar class="elevation-1 primary" dark app>
      <v-toolbar-title>
      <v-btn flat @click="drawer = !drawer"  > <v-icon>menu</v-icon></v-btn>
      <v-btn flat @click="$router.push('/timeline')"> <v-icon v-for="i in 3" :key="i">attach_money</v-icon></v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn flat v-if="isLoggedIn"> <v-icon >favorite_border</v-icon> My likes</v-btn>
      
      <v-menu bottom offset-y offset-y2 v-if="isLoggedIn">
        <v-btn slot="activator" flat>
          <v-icon  class="avatar" v-if="!authUser.picture">person</v-icon>
          <img v-else  class="avatar" :src="authUser.picture" :alt="authUser.name" srcset="">
        </v-btn>
        <v-list>
            <v-btn @click="$router.push('/logout')" class="" large block flat>
              <v-icon left>exit_to_app</v-icon>
              Logout
            </v-btn>
            <v-btn @click="$router.push('/sellers/' + authUser.id)" class="" large block flat>
              <v-icon left>account_circle</v-icon>
              My Account
            </v-btn>
            <v-btn @click="$router.push('/products/new')" class="" large block flat>
              <v-icon left>add</v-icon>
              Add Product
            </v-btn>
        </v-list>
      </v-menu>
      <v-btn v-if="!isLoggedIn" large class="green" @click="$router.push('/join-us')"> Join Us </v-btn>
      <v-btn v-if="!isLoggedIn" large flat @click="$router.push('/login')"> login </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer>
      <span>&copy; 2018</span> .HIT-Connect Creative Solutions
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import { CHECK_LOGIN_STATUS, CHECK_USER_PROFILE } from './store/mutation-types'
import * as VList from 'vuetify/es5/components/VList'

import {
  VTextField,
  VIcon,
  VMenu
} from 'vuetify'
export default {
  components: {
    VTextField,
    VIcon,
    VList: VList.VList,
    VListTile: VList.VListTile,
    VListTileAvatar: VList.VListTileAvatar,
    VListTileContent: VList.VListTileContent,
    VListTileAction: VList.VListTileAction,
    VListTitle: VList.VListTitle,
    VMenu
  },
  mounted () {
    this.$store.commit(CHECK_LOGIN_STATUS)
    this.$store.commit(CHECK_USER_PROFILE)
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        { title: 'Home', icon: 'dashboard', url: '/' },
        { title: 'My Products', icon: 'list', url: '/account/products' },
        { title: 'Upload New Product', icon: 'add', url: '/products/new' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Hit-Connect',
      mini: true
    }
  },
  name: 'App',
  computed: mapGetters(['isLoggedIn', 'authUser'])
}
</script>

<style scoped>
  .avatar{
    border: 2px snow solid;
  }
  .avatar:hover{
    transform: scale(1.1, 1.1)
  }
</style>

