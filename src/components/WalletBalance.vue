<template>
<div class="row align-items-center" style="width: 100%;">
  <div class="col-md-12 shadow-lg border-0 py-3 m-3 text-center wallet align rounded">
    <h6 style="color: rgb(156, 224, 245);">WALLET BALANCE</h6>
    <h2 class="font-weight-bold" style="color: rgb(243, 246, 249);">${{ balance }}</h2>
  </div>
</div>
</template>

<script>
import { getAccessToken } from '../utils/auth'
import axios from './../utils/axios'
export default {
  mounted: function () {
    this.load()
    this.$root.$on('wallet-refresh', () => this.load())
  },
  data () {
    return {
      balance: 0
    }
  },
  methods: {
    async load () {
      let response = await axios.get('/balance', {
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`
        }
      })
      if (response.status === 200) {
        this.balance = response.data.balance
      }
    }
  }
}
</script>

<style scoped>
.wallet{
  background-color: rgb(85, 128, 170);
}
</style>
