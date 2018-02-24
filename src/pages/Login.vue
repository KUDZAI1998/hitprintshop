<template>
  <div>
    <v-card class="login-card">
      <v-container>
        <h3 class="login-title">Login</h3>
      
        <v-btn block class="blue white--text mb-3">
          <span class="mr-3 bolder">F</span> Login with facebook
        </v-btn>
        <v-btn block class="red white--text mb-3">
          <span class="mr-3 bolder">G</span> Login with google
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
  VTextField
} from 'vuetify'

export default {
  name: 'Login',
  components: {
    VCard,
    VIcon,
    VTextField
  }
}
</script>

<style scoped>
  .login-card {
    margin: 60px auto;
    max-width: 400px;
  }

  .login-title {
    font-size: 25px;
    font-weight: lighter;
    display: block;
    margin: 20px auto;
    text-align: center;
  }

  .bolder {
    font-size: 25px;
    display: block;
    height: 35px;
    width: 35px;
    border-radius: 50%;
    border: #fff 2px solid;
    font-weight: bolder
  }
</style>
