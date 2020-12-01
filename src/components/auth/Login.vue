<template>
<div class="container-fluid body">
  <div class="col-md-12 d-flex align-items-center justify-content-center" id="main_column">
    <div class="card border-0" id="login_card">
      <div class="card-header">
        <h4 class="card-title text-primary font-weight-bold" data-toggle="tooltip" title="Developed By Ngonidzashe Mangudya"><span id="brand_span">hit</span>printshop</h4>
        <h6 class="card-subtitle"><small>Log into your account <span><router-link to="/signup">or register</router-link></span> or <span class="text-primary" data-toggle="modal" data-target="#forgotPasswordModal">you forgot your password?</span></small></h6>
      </div>
      <div class="card-body">
        <div class="row p-1">
          <div class="col-md-12">
            <input v-model="regNumber" type="text" class="form-control border-0 shadow-lg" name="regNumber" id="reg_number" placeholder="HIT Registration Number" required>
          </div>
        </div>
        <div class="row p-1">
          <div class="col-md-12">
            <input v-model="password" type="password" class="form-control border-0 shadow-lg" name="password" id="password" placeholder="Password" required>
          </div>
        </div>
        <div class="row p-1">
          <div class="col-md-12">
            <input type="submit" @click="login()" class="form-control border-0 shadow-lg btn btn-primary" value="Log In" id="login_button">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade shadow-lg border-0" id="forgotPasswordModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title font-weight-bold">Forgot Password</h4>
        </div>
        <div class="modal-body">
          <form action="https://hitprintshop.herokuapp.com/forgot_password" method="POST">
            <div class="row p-1">
              <div class="col-md-12">
                <input type="text" class="form-control border-0 shadow-lg" name="regNumber" placeholder="Registration Number" required>
              </div>
            </div>
            <div class="row p-1">
              <div class="col-md-12">
                <input type="submit" class="form-control border-0 shadow-lg btn btn-primary" value="Retrieve Password">
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
import axios from '../../utils/axios'
import { setAccessToken } from '../../utils/auth'
import { authenticate } from '../../router/guards'
export default {
  data () {
    return {
      regNumber: '',
      password: ''
    }
  },
  methods: {
    async login () {
      event.preventDefault()
      let btn = document.getElementById('login_button')
      btn.value = 'Processing'
      let response = await axios.post('/signin', {
        regNumber: this.regNumber, password: this.password
      }).catch(function (error) {
        btn.value = 'Log In'
        window.alert(error.response.data.message)
      })
      btn.value = 'Log In'
      if (response.data.status === 200) {
        this.$toasted.success('Success')
        setAccessToken(response.data.token)
        setTimeout(function () {
          this.isLoggedIn = authenticate()
          window.location.replace('/')
        }, 1500)
      } else if (response.status === 404) {
        window.alert('Student ID not registered')
      } else if (response.status === 403) {
        window.alert('Incorrect password')
      } else {
        window.alert('Unexpected error')
      }
    }
  }
}
</script>

<style scoped>
.body{
  height: 100vh;
  font-family: 'Poppins', sans-serif;
  background-image: url('/static/images/graduation.jpg');
  background-size: cover;
  background-repeat: repeat;
  -webkit-animation: backgroundScroll 15s linear 1;
  -webkit-animation-fill-mode: forwards;
  animation: backgroundScroll 15s linear 1;
  animation-fill-mode: forwards;
}

#main{
  height: 100vh;
  width: 100vw;
}

#main_column{
  height: 100vh;
  width: 100vw;
  backdrop-filter: blur(6px);
}

#brand_span{
  color: orange;
}

@keyframes backgroundScroll {
  from {background-position: 180 0;}
  to {background-position: -180px 0px;}
}

@-webkit-keyframes backgroundScroll {
  from {background-position: 180 0;}
  to {background-position: -180px 0px;}
}
</style>
