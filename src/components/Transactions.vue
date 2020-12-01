<template>
<div class="row align-items-center" style="width: 100%;">
  <div class="col-md-12 my-3">
    <table class="table table-hover border-0 shadow-lg rounded">
      <thead>
        <tr style="background-color: rgb(242, 245, 247); color: rgb(108, 117, 127);">
          <th>Transaction Reference</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="transactions.length > 0">
          <tr v-for="transaction in transactions" :key="transaction._id">
            <td>{{ transaction.reference }}</td>
            <td>{{ transaction.amount }}</td>
            <td>{{ new Date(transaction.created_at).toLocaleString() }}</td>
            <td><span class="badge badge-pill isComplete">Processed</span></td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="4">You haven't made any transactions yet 💰.</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import { getAccessToken } from '../utils/auth'
import axios from './../utils/axios'
export default {
  mounted: function () {
    this.load()
  },
  data () {
    return {
      transactions: []
    }
  },
  methods: {
    async load () {
      let response = await axios.get('/transactions', {
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`
        }
      })
      if (response.status === 200) {
        console.log(response.data)
        this.transactions = response.data.transactions
      }
    }
  }
}
</script>

<style scoped>
.isComplete{
  background-color: rgba(0, 186, 68, 0.2);
  color: rgb(0, 186, 68);
}
</style>
