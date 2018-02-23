<template>
  <div>
    <v-card>
      <v-container>
        <h3>Join as</h3>
        <v-radio-group v-model="row" row style="width: 300px">
          <v-radio label="Buyer" value="buyer" ></v-radio>
          <v-radio label="Seller" value="seller"></v-radio>
        </v-radio-group>
      </v-container>
    </v-card>

    <v-container>
      <v-alert outline color="info" icon="info" :value="showAlert">
        <p>
        Now that you are joining us as a Seller you will have to visit our offices 
        <code>   <v-icon>location_on</v-icon> Hostel 3 Room 115 </code>      
        for your account to be approved.
        </p>
        <p>Be sure to bring your school and national ID</p>
      </v-alert>

      <v-btn large class="blue white--text">
      <span class="bolder mr-3">F</span> Join with facebook
    </v-btn>

    <v-btn large class="red white--text">
      <span class="bolder mr-3">G</span> Join with google
    </v-btn>
    </v-container>
  </div>
</template>

<script>
import {
  VCard,
  VAlert
} from 'vuetify'

import * as VRadioGroup from 'vuetify/es5/components/VRadioGroup'

export default {
  name: 'JoinUs',
  components: {
    VCard,
    VRadioGroup: VRadioGroup.VRadioGroup,
    VRadio: VRadioGroup.VRadio,
    VAlert
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
</style>
