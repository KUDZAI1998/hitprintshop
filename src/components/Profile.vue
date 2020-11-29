<template>
<div class="container-fluid my-5">
  <div class="row align-items-center" style="width: 100%;">
    <div class="col-md-12 py-3 m-3 profile rounded">
      <div class="card border-0 shadow-lg">
        <div class="card-body">
          <h4 class="font-weight-bold text-primary">PROFILE</h4>
          <div class="row">
            <div class="col-3 m-0">
              <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Student Info</a>
                <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Contact Details</a>
                <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Wallet Balance</a>
                <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Documents</a>
              </div>
            </div>
            <div class="col-9">
              <div class="tab-content" id="v-pills-tabContent">
                <div class="tab-pane fade show active dont-show" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                  <h3 style="color: #717983;">Name</h3>
                  <div class="d-inline-block">
                    <input type="checkbox" checked>
                    <span style="color: #717983;">{{ name }}</span>
                  </div>
                  <h3 style="color: #717983;">Registration ID</h3>
                  <div class="d-inline-block">
                    <input type="checkbox" checked>
                    <span style="color: #717983;">{{ regNumber }}</span>
                  </div>
                </div>
                <div class="tab-pane fade dont-show" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                  <h3 style="color: #717983;">Email</h3>
                  <div class="d-inline-block">
                    <input type="checkbox" checked>
                    <span style="color: #717983;">{{ email }}</span>
                  </div>
                  <h3 style="color: #717983;">Phone</h3>
                  <div class="d-inline-block">
                    <input type="checkbox" checked>
                    <span style="color: #717983;">{{ mobile }}</span>
                  </div>
                </div>
                <div class="tab-pane fade dont-show" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                  <h3 style="color: #717983;">${{ balance }} <small>left in wallet.</small></h3>
                </div>
                <div class="tab-pane fade dont-show" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                  <h3 style="color: #717983;">{{ count }} <small>document(s) have been submitted.</small></h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card border-0 shadow-lg my-3">
        <div class="card-body">
          <h4 class="font-weight-bold text-primary">SECURITY</h4>
          <div class="row">
            <div class="col-3 m-0">
              <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-transactions" role="tab" aria-controls="v-pills-home" aria-selected="true">Transactions</a>
                <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-password" role="tab" aria-controls="v-pills-profile" aria-selected="false">Update Password</a>
              </div>
            </div>
            <div class="col-9">
              <div class="tab-content" id="v-pills-tabContent">
                <div class="tab-pane fade show active dont-show" id="v-pills-transactions" role="tabpanel" aria-labelledby="v-pills-home-tab">
                  <button class="btn btn-primary" @click="requestData()">Request Transaction Data</button>
                </div>
                <div class="tab-pane fade dont-show" id="v-pills-password" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-12">
                          <input type="hidden" name="token" id="token_field2">
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12 py-2">
                          <input type="password" v-model="old" class="form-control border-0 shadow-lg" name="old" id="old_password" placeholder="Current password" required>
                        </div>
                        <div class="col-md-12 py-2">
                          <input type="password" v-model="neww" class="form-control border-0 shadow-lg" name="neww" id="new_password" placeholder="New password" required>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12 py-2">
                          <input type="button" @click="changePassword()" class="btn btn-primary form-control" value="Change Password">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
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
      let response = await axios.get('https://hitprintshop.herokuapp.com/info', {
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
      let response = await axios.post('https://hitprintshop.herokuapp.com/change_password', {
        old: this.old,
        neww: this.neww,
        token: getAccessToken()
      }).catch(function (error) {
        window.alert(error.response.data.message)
      })

      if (response.status === 200) {
        window.alert(response.data.message)
      } else if (response.status === 422) {
        window.alert('Incorrect password')
      }
    },

    async requestData () {
      let response = await axios.get(`https://hitprintshop.herokuapp.com/tInfo/${this.regNumber}`)
      if (response.status === 200) {
        window.alert(response.data.message)
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
  background: rgb(211, 218, 224);
  color: #000;
  font-weight: bold;
}

.dont-show{
  background-color: #fff;
  border-radius: 0px;
}
</style>
