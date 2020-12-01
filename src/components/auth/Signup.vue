<template>
<div class="container-fluid body">
  <div class="row" id="main">
    <div class="col-md-12 d-flex align-items-center justify-content-center" id="main_column">
      <div class="card border-0" id="login_card">
        <div class="card-header">
          <h4 class="card-title text-primary font-weight-bold" data-toggle="tooltip" title="Developed By Ngonidzashe Mangudya"><span id="brand_span">hit</span>printshop</h4>
          <h6 class="card-subtitle"><small>Signup for an account <span><router-link to="/login">or login to your account</router-link></span></small></h6>
        </div>
        <div class="card-body">
          <form>
            <div class="row p-1">
              <div class="col-md-6">
                <input v-model="fullName" type="text" class="form-control border-0 shadow-lg" name="name" id="name" placeholder="Full Name" required>
              </div>
              <div class="col-md-6">
                <input v-model="regNumber" type="text" class="form-control border-0 shadow-lg" name="regNumber" id="reg_number" placeholder="HIT Registration Number" required>
              </div>
            </div>
            <div class="row p-1">
              <div class="col-md-6">
                <input v-model="emailAddress" type="text" class="form-control border-0 shadow-lg" name="email" id="email" placeholder="Email Address" required>
              </div>
              <div class="col-md-6">
                <input v-model="mobileNumber" type="text" class="form-control border-0 shadow-lg" name="mobile" id="mobile" placeholder="Mobile Number" required>
              </div>
            </div>
            <div class="row p-1">
              <div class="col-md-12">
                <input v-model="password" type="password" class="form-control border-0 shadow-lg" name="password" id="password" placeholder="Password" required>
              </div>
            </div>
            <div class="row p-1">
              <div class="col-md-12">
                <input type="submit" @click="signup()" class="form-control border-0 shadow-lg btn btn-primary" value="Sign Up" id="signup_button">
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
import axios from './../../utils/axios'
export default {
  data () {
    return {
      fullName: '',
      regNumber: '',
      emailAddress: '',
      mobileNumber: '',
      password: ''
    }
  },
  methods: {
    async signup () {
      event.preventDefault()
      var btn = document.getElementById('signup_button')
      btn.value = 'Processing'
      let response = await axios.post('/signup', {
        name: this.fullName,
        regNumber: this.regNumber,
        email: this.emailAddress,
        mobile: this.mobileNumber,
        password: this.password
      }).catch(function (error) {
        btn.value = 'Sign Up'
        window.alert(error.response.data.message)
      })
      btn.value = 'Sign Up'
      if (response.data.status === 200) {
        this.$toasted.success('Success')
        setTimeout(function () {
          window.location.replace('/')
        }, 1500)
      } else if (response.status === 400) {
        window.alert('Error. Not saved.')
      } else if (response.status === 401) {
        window.alert('ID used does not belong to HIT.')
      } else if (response.status === 403) {
        window.alert('Student already registered')
      } else {
        window.alert('Unexpected error')
      }
    }
  }
}
</script>

<style scoped>
.body{
  font-family: 'Poppins', sans-serif;
  background-image: url('/static/images/home.jpg');
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
