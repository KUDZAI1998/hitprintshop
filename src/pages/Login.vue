<template>
  <div>
    <v-card class="login-card">
      <v-container>
        <h3 class="login-title">Login</h3>
      
        <v-btn block class="blue white--text mb-3"> <v-icon left>mdi-facebook</v-icon> Login with facebook</v-btn>
        <v-btn block class="red white--text mb-3"><v-icon left>mdi-google</v-icon> Login with google</v-btn>
        <hr>
        <v-btn outline huge block class="mt-3">Join</v-btn>
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
</style>
