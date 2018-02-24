<template>
  <v-app>
    <v-toolbar class="elevation-1 primary" dark >
      <v-toolbar-title>
      <v-btn flat @click="$router.push('/timeline')"> <v-icon>wifi</v-icon> Hit Connect</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
       slot="extension"
            prepend-icon="search"
            label="Search for goods and services"
            solo-inverted
            class="mx-3"
            flat/>

      <v-btn flat> <v-icon >trending_up</v-icon> Trending Deals</v-btn>
      
      <v-btn flat>
        <v-icon >person</v-icon>
        My account
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span> .HIT-Connect Creative Solutions
    </v-footer>
  </v-app>
</template>

<script>
import {
  VTextField,
  VIcon
} from 'vuetify'
export default {
  components: {
    VTextField,
    VIcon
  },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Hit-Connect'
    }
  },
  name: 'App'
}
</script>
