<template>
  <v-app>
    <v-toolbar class="elevation-1 primary" dark >
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
       slot="extension"
            prepend-icon="search"
            label="Search for goods and services"
            solo-inverted
            class="mx-3"
            flat/>
      <v-btn flat>
        My account
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import {
  VTextField
} from 'vuetify'
export default {
  components: {
    VTextField
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
