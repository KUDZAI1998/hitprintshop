<template>
  <div>
    <NavBar v-if="isLoggedIn" />
    <router-view v-if="isLoggedIn"/>
    <Login v-if="!isLoggedIn && this.$router.currentRoute.path != '/signup'"/>
    <Signup v-if="!isLoggedIn && this.$router.currentRoute.path == '/signup'"/>

    <div class="modal fade border-0 shadow-lg" id="topup_modal">
      <div class="modal-dialog border-0">
        <div class="modal-content border-0">
          <div class="modal-header border-0 shadow-lg">
            <h6 class="modal-title font-weight-bold">
              Topup Your Account [Ecocash/OneMoney]
            </h6>
          </div>
          <div class="modal-body border-0 shadow-lg">
            <form action="https://hitprintshop.herokuapp.com/topup" method="POST">
              <div class="row">
                <div class="col-md-12">
                  <input v-model="token" type="hidden" name="token" id="token_field">
                </div>
              </div>
              <div class="row p-1">
                <div class="col-md-6">
                  <input type="text" class="form-control border-0 shadow-lg" name="name" id="user_name" placeholder="Your Name">
                </div>
                <div class="col-md-6">
                  <input type="text" class="form-control border-0 shadow-lg" name="regnumber" id="user_regnumber" placeholder="HIT School Reg Number">
                </div>
              </div>
              <div class="row p-1">
                <div class="col-md-12">
                  <input type="tel" class="form-control border-0 shadow-lg" name="mobile" id="user_mobile" placeholder="Mobile Number">
                </div>
              </div>
              <div class="row p-1">
                <div class="col-md-12">
                  <select class="form-control border-0 shadow-lg" name="wallet" id="mobile_wallet" required>
                    <option value="" selected>Choose Mobile Wallet</option>
                    <option value="onemoney">OneMoney</option>
                    <option value="ecocash">EcoCash</option>
                  </select>
                </div>
              </div>
              <div class="row p-1">
                <div class="col-md-12">
                  <input type="number" class="form-control border-0 shadow-lg" name="amount" id="topup_amount" placeholder="Amount" required>
                </div>
              </div>
              <div class="row p-1">
                <div class="col-md-12">
                  <input type="submit" class="form-control btn border-0 shadow-lg font-weight-bold" id="topup_button" value="Topup Account">
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade border-0 shadow-lg" id="submit_modal">
      <div class="modal-dialog border-0">
        <div class="modal-content border-0">
          <div class="modal-header border-0 shadow-lg">
            <h6 class="modal-title font-weight-bold">
              Submit Your Document For Printing {{ pageCount }}
            </h6>
          </div>
          <div class="modal-body border-0 shadow-lg">
            <form action="https://hitprintshop.herokuapp.com/upload" method="POST" enctype="multipart/form-data">
              <div class="row p-1">
                <div class="col-md-12">
                  <input v-model="token" type="hidden" name="token" id="token_field">
                </div>
              </div>
              <div class="row p-1">
                <div class="col-md-12">
                  <input type="text" class="form-control border-0 shadow-lg" name="name" id="name" placeholder="Document Name" required>
                </div>
              </div>
              <div class="row p-1">
                <div class="col-md-10">
                  <input @change="inputChange()" type="file" class="form-control border-0 shadow-lg" name="file" id="file" required>
                </div>
                <div class="col-md-2">
                  <input type="text" v-model="pageCount" class="form-control border-0 shadow-lg" name="pagecount" id="pagecount" required>
                </div>
              </div>
              <div class="row p-1">
                <div class="col-md-12">
                  <textarea name="instructions" id="instructions" cols="30" rows="5" class="form-control border-0 shadow-lg" placeholder="Please include submission instructions" required></textarea>
                </div>
              </div>
              <div class="row p-1">
                <div class="col-md-12">
                  <input type="submit" class="form-control btn border-0 shadow-lg font-weight-bold" id="submit_button" value="Submit Document">
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import {authenticate} from './router/guards'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import { getAccessToken } from './utils/auth'
export default {
  name: 'App',
  components: {
    NavBar,
    Login,
    Signup
  },
  data () {
    return {
      isLoggedIn: authenticate(),
      token: getAccessToken(),
      pageCount: 0,
      reader: new FileReader()
    }
  },
  methods: {
    inputChange () {
      let file = document.getElementById('file')
      this.reader.addEventListener('loadend', this.handleEvent)
      this.reader.readAsBinaryString(file.files[0])
    },
    handleEvent (event) {
      if (event.type === 'loadend') {
        let count = this.reader.result.match(/\/Type[/s]*\/Page[^s]/g).length
        this.pageCount = count
      }
    }
  }
}
</script>

<style scoped>
#topup_button {
  background-color: rgb(85, 128, 170);
  color: #fff;
  box-shadow: inset 0 1px 0 hsl(224, 84%, 74%);
  box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.2);
}

#submit_button {
  background-color: rgb(85, 128, 170);
  color: #fff;
  box-shadow: inset 0 1px 0 hsl(224, 84%, 74%);
  box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.2);
}
</style>

