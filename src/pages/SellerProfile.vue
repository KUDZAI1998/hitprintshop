<template>
  <div>
    <div v-if="!userData" class="profile-wallpaper" >
       <v-progress-circular class="mt-5" indeterminate :width="3" size="70" color="white"></v-progress-circular>
    </div>
    <div v-else class="profile-wallpaper" >
      <div class="profile-names">
        
      <!-- use usernames in the future -->
        <v-icon v-if="!userData.picture" class="avatar mt-3" color="white">perm_identity</v-icon>
        <img v-else class="avatar mt-3" :src="userData.picture" alt="">
        <v-btn class="white primary--text mt-3 pr-3 pl-4" v-if="isOwner"><v-icon left>settings</v-icon> Settings</v-btn>
        <v-btn class="white primary--white mt-3 pr-3 pl-4" v-else> <v-icon>directions_walk</v-icon> Follow</v-btn>
        <h3 class="profile-username">@{{ userData.username }}</h3>
        <h5 class="profile-name">{{ userData.name }}</h5>
      </div>
    </div>
    
    <div class="nav-bar">
      
      <v-toolbar
        color="primary"
        dark
        tabs>
        <v-text-field
          prepend-icon="search"
          append-icon="mic"
          label="Search for my products"
          solo-inverted
          class="mx-3"
          flat/>
        <v-tabs
          slot="extension"
          centered
          v-model="tabs"
          slider-color="white"
          color="transparent">
          <v-tab href="#products">
            Products
          </v-tab>

          <v-tab href="#followers">
            Followers
          </v-tab>
        </v-tabs>
        <v-btn
              dark
              absolute
              bottom
              left
              fab
              class="white primary--text" v-if="isOwner" 
              style="left: 40px"
              @click="$router.push('/products/new')"
            >
              <v-icon>add</v-icon>
            </v-btn>
      </v-toolbar>

      <v-tabs-items v-model="tabs" class="mt-3">
        <v-tab-item id="products">
          <app-timeline :isOwner="isOwner"></app-timeline>
        </v-tab-item>

        <v-tab-item id="followers">
          <v-container>
            Followers
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import {
  VIcon,
  VToolbar,
  VProgressCircular,
  VTextField
  /* VTabs,
  VTab,
  VTabItems,
  VTabItem */
} from 'vuetify'
import * as VTabs from 'vuetify/es5/components/VTabs'
import AppTimeline from '@/components/AppTimeline'
import { mapGetters } from 'vuex'
import { getTokenObject } from '@/utils/auth'

export default {
  name: 'SellerProfile',
  components: {
    VIcon,
    VToolbar,
    VTextField,
    VTabs: VTabs.VTabs,
    VTab: VTabs.VTab,
    VTabsItems: VTabs.VTabsItems,
    VTabItem: VTabs.VTabItem,
    VProgressCircular,
    AppTimeline
  },
  mounted () {
    const authHeader = `${getTokenObject().tokenType} ${getTokenObject().accessToken}`
    this.$http.get(`/users/username/${this.$route.params.username}`, {
      headers: {
        Authorization: authHeader
      }
    }).then(response => {
      this.userData = response.data
    }).catch(console.log)
  },
  data: () => ({
    tabs: '',
    userData: null
  }),
  computed: {
    ...mapGetters(['authUser']),
    isOwner () {
      return this.authUser.username === this.$route.params.username
    }
  }
}
</script>

<style scoped>
  .profile-wallpaper{
    background: #466368;
    background: -webkit-linear-gradient(#648880, #293f50);
    background: -moz-linear-gradient(#648880, #293f50);
    background: -o-linear-gradient(#648880, #293f50);
    background: linear-gradient(#648880, #293f50);
    background-image: url(https://cdn.pixabay.com/photo/2016/10/11/21/43/banner-1732847_960_720.jpg);
    background-position: center;
    background-size: cover;
    height: 350px;
    padding: 30px 0 0 0;
    position: relative;
  }

  .profile-names {
    position: absolute;
    bottom: 20px;
    left: 20px;
  }

  .profile-username {
    font-size: 40px;
    font-weight: bold;
    color: snow
  }
  .profile-name {
    font-size: 20px;
    color: snow;
  }
  .avatar{
    border: 2px snow solid;
    height: 80px;
    width: 80px;
  }
  .profile-avatar{
    background: rgb(16, 89, 148);
    border: 2px snow solid;
    bottom: 80px;
    height: 120px;
    width: 120px;
    border-radius: 50%;
    margin: 10px auto;
    z-index: 10;
    padding: 18px;
  }
  .nav-bar {
    width: 100%;
    border-top: 2px snow solid
  }
</style>
