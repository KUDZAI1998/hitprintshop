<template>
  <div>
    <v-card class="login-card">
      <div class="primary white--text media-block" style="height: 200px">
        <v-icon class="media-block-icon white--text">fingerprint</v-icon>
        <h3 class="login-title">Login</h3>
      </div>
      <v-progress-linear :indeterminate="true" v-if="loggingIn"></v-progress-linear>
      <v-container>
        <v-btn :href="`${baseURL}/auth/google/g`" @click="loggingIn = true" block large class="white red--text mb-3 elevation-1">
          <span class="mr-3 bolder">G</span> Login with google
        </v-btn>

        <v-btn block large class="white blue--text mb-3 elevation-1">
          <span class="mr-3 bolder">F</span> Login with facebook
        </v-btn>

        <hr>
        <v-btn outline large block class="mt-3" @click="$router.push('/join-us')">Join Us</v-btn>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import {
  VCard,
  VIcon,
  VTextField,
  VProgressLinear
} from 'vuetify'
import { baseURL } from '@/utils/axios'

export default {
  name: 'Login',
  components: {
    VCard,
    VIcon,
    VTextField,
    VProgressLinear
  },
  data: () => ({
    loggingIn: false,
    baseURL
  })
}
</script>

<style scoped>
  .login-card {
    margin: 60px auto;
    max-width: 400px;
  }

  .media-block {
    position: relative;
  }

  .media-block-icon {
    position: absolute;
    font-size: 100px;
    left: 40%;
    top: 18%;
  }
  .login-title {
    font-size: 25px;
    font-weight: lighter;
    display: block;
    margin: 20px auto;
    text-align: center;
    position: absolute;
    bottom: 0px;
    left: 45%
  }

  .bolder {
    font-size: 25px;
    display: block;
    height: 35px;
    width: 35px;
    border-radius: 50%;
    border: #fff 2px solid;
    font-weight: bolder;
    margin-bottom: 8px
  }
</style>
