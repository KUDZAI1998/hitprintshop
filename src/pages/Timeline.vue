<template>
  <div>
    <v-container>
      <v-text-field placeholder="Search" prepend-icon="search" solo></v-text-field>
    
      <app-timeline></app-timeline>
    </v-container>
  </div>
</template>

<script>
import AppTimeline from '@/components/AppTimeline'
import {
  VTextField
} from 'vuetify'

export default {
  name: 'Timeline',
  components: {
    AppTimeline,
    VTextField
  }
}
</script>
