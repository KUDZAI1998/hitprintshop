<template>
  <nav class="nav navbar navbar-expand-md mx-2" style="background-color: inherit; border-bottom: 2px solid rgba(109, 115, 126, 0.2);">
    <a href="/" class="navbar-brand"><h2 class="font-weight-bold"><span id="brand_span">hit</span>printshop</h2></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar"><span class="navbar-toggler-icon text-white"><i class="fa fa-bars"></i></span></button>
    <div class="collapse navbar-collapse" id="navbar">
      <ul class="nav navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link font-weight-bold" id="navbar_links">Overview</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="modal" data-target="#topup_modal" id="navbar_links">Top Up</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="modal" data-target="#submit_modal" id="navbar_links">Submit</a>
        </li>
        <li class="nav-item">
          <router-link to="/profile" class="nav-link" id="navbar_links">Profile</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link dropdown" id="navbar_links" data-toggle="dropdown">Session
            <div class="dropdown-menu">
              <a @click="logOut()" class="dropdown-item">Logout</a>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { logout } from '../utils/auth'
export default {
  methods: {
    logOut () {
      logout()
    }
  }
}
</script>

<style scoped>
#topup_button, #submit_button{
  transition: .4s all;
}

#topup_button:hover, #submit_button:hover{
  color: #f5f5f5;
  transform: scale(1.01);
}

#brand_span{
  color: orange;
}

#navbar_links{
  color: #717983;
  transition: .5s all;
}

#navbar_links:hover{
  color: #434346;
  transform: scale(1.02 );
}
</style>
