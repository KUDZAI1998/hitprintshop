<template>
<div class="container-fluid my-5 mx-3">
  <div class="row align-items-center text-secondary" style="width=100%;">
    <div class="col-md-12">
      <h3>General Information</h3>
      <h6 class="font-weight-bold">Student Information</h6>
      <hr>
      <p>Name: <span>{{ name }}</span></p>
      <p>Registration Number: <span>{{ regNumber }}</span></p>
      <h6 class="font-weight-bold">Contact Details</h6>
      <hr>
      <p>Email Address: <span>{{ email }}</span></p>
      <p>Mobile Number: <span>{{ mobile }}</span></p>
      <h6 class="font-weight-bold">Wallet Balance</h6>
      <hr>
      <p>You're left with ${{ balance }} in your wallet.</p>
      <h6 class="font-weight-bold">Document Submission</h6>
      <hr>
      <p>You have submitted {{ count }} document(s) for printing.</p>
      <h3>Security Information</h3>
      <h6 class="font-weight-bold">Change Password</h6>
      <hr>
      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12">
              <input type="hidden" name="token" id="token_field2">
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 py-2">
              <input type="password" v-model="old" class="form-control" name="old" id="old_password" placeholder="Current password" required>
            </div>
            <div class="col-md-12 py-2">
              <input type="password" v-model="neww" class="form-control" name="neww" id="new_password" placeholder="New password" required>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 py-2">
              <button @click="changePassword()" class="btn form-control">Change Password</button>
            </div>
          </div>
        </div>
      </div>
      <br>
      <h6 class="font-weight-bold">Transaction Data</h6>
      <button class="btn form-control" @click="requestData()">Request Transaction Data</button>
      <hr>
    </div>
  </div>
</div>
</template>

<script>
import axios from './../utils/axios'
import { getAccessToken } from '../utils/auth'
export default {
  mounted: function () {
    this.load()
  },
  data () {
    return {
      name: '',
      mobile: '',
      regNumber: '',
      email: '',
      balance: 0,
      count: 0,
      old: '',
      neww: ''
    }
  },
  methods: {
    async load () {
      let response = await axios.get('/info', {
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`
        }
      })
      if (response.status === 200) {
        this.name = response.data.name
        this.mobile = response.data.mobile
        this.regNumber = response.data.regNumber
        this.email = response.data.email
        this.balance = response.data.balance
        this.count = response.data.count
      }
    },
    async changePassword () {
      let response = await axios.post('/change_password', {
        old: this.old,
        neww: this.neww
      }, {
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`
        }
      }).catch(function (error) {
        window.alert(error.response.data.message)
      })

      if (response.status === 200) {
        this.$toasted.success(response.data.message)
      } else if (response.status === 422) {
        window.alert('Incorrect password')
      }
    },

    async requestData () {
      let response = await axios.get(`/tInfo/${this.regNumber}`)
      if (response.status === 200) {
        this.$toasted.success(response.data.message)
      }
    }
  }
}
</script>

<style scoped>
.profile{
  background-color: rgb(250, 250, 250);
}

.nav-link{
  padding-top: 3px;
  padding-bottom: 3px;
  color: #717983;
}

.active{
  background: rgb(85, 128, 170);
  color: #000;
  font-weight: bold;
}

.dont-show{
  background-color: #fff;
  border-radius: 0px;
}

input{
  background-color: inherit;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid rgba(128, 128, 128, 0.4);
}

input:focus, textarea:focus, select:focus{
  outline: none;
}

button{
  background-color: rgb(85, 128, 170);
  color: #fff;
}

button:hover{
  color: #fff;
  transform: scale(1.01);
}
</style>
