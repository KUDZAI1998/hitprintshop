<template>
  <v-app>
    <v-content>
      <v-container>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-5" style="border-top: #1976d2 2px solid">
              <v-container class="padding">
                <v-btn block large class="white red--text mb-3 elevation-3">
                  <img class="rmargin" src="../assets/google.png" alt="google"> Join with google
                </v-btn>
                <v-btn block large class="white blue--text mb-3 elevation-3">
                  <img class="rmargin" src="../assets/facebook.png" alt="google"> Join with facebook
                </v-btn>
                <hr>
                <v-btn outline large block class="mt-3" @click="$router.push('/login')">Already Signed In? Log In</v-btn>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {
  VCard,
  VIcon,
  VAlert
} from 'vuetify'

import * as VRadioGroup from 'vuetify/es5/components/VRadioGroup'

export default {
  name: 'JoinUs',
  components: {
    VCard,
    VRadioGroup: VRadioGroup.VRadioGroup,
    VRadio: VRadioGroup.VRadio,
    VAlert,
    VIcon
  },
  data: () => ({
    row: 'buyer'
  }),
  computed: {
    showAlert (value) {
      return this.row === 'seller'
    }
  }
}
</script>

<style scoped>
  .bolder {
    font-size: 25px;
    display: block;
    height: 35px;
    width: 35px;
    border-radius: 50%;
    border: #fff 2px solid;
    font-weight: bolder
  }
  .login-card {
    margin: 60px auto;
    max-width: 400px;
  }
  .rmargin{
    margin-right: 4px
  }
  .padding{
    padding-top: 50px;
    padding-bottom: 50px;
  }
</style>
