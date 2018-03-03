<template>
  <div>
    <div class="profile-wallpaper">
      <h3 class="profile-username">@kay_p</h3>
      <h5 class="profile-names">Kudakwashe Paradzayi</h5>
      <v-btn class="primary text--white mt-3 pr-3 pl-4">Follow</v-btn>
      <div class="profile-avatar">
        <v-icon size="80px" color="white">perm_identity</v-icon>
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
          label="Search for products by @Kay_p"
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
      </v-toolbar>

      <v-tabs-items v-model="tabs" class="mt-3">
        <v-tab-item id="products">
          <app-timeline></app-timeline>
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
  VTextField
  /* VTabs,
  VTab,
  VTabItems,
  VTabItem */
} from 'vuetify'
import * as VTabs from 'vuetify/es5/components/VTabs'
import AppTimeline from '@/components/AppTimeline'

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
    AppTimeline
  },
  data: () => ({
    tabs: ''
  })
}
</script>

<style scoped>
  .profile-wallpaper{
    background: #466368;
    background: -webkit-linear-gradient(#648880, #293f50);
    background: -moz-linear-gradient(#648880, #293f50);
    background: -o-linear-gradient(#648880, #293f50);
    background: linear-gradient(#648880, #293f50);
    height: 350px;
    padding: 30px 0 0 0;
    text-align: center
  }

  .profile-username {
    font-size: 40px;
    font-weight: bold;
    color: snow
  }
  .profile-names {
    font-size: 20px;
    color: snow;
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
