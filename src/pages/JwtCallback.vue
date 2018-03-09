<template>
  <div class="container">
    <p v-if="authenticated">
      You have successfully been logged in. <br>
      <button class="continue-btn"> Continue <v-icon class="white--text">arrow_forward</v-icon> </button>
    </p>
    <p v-if="!authenticated && !attemptedAuthentication">Finishing up the authentication process....</p>
    <p v-if="!authenticated && attemptedAuthentication">
      The system failed to sign you in. <br>
      <button class="continue-btn" @click="$router.push('/login')"> Login Again <v-icon class="white--text">lock_open</v-icon> </button>
    </p>
  </div>
</template>

<script>
import { setUserProfile, setAccessToken } from '@/utils/auth'
export default {
  name: 'GoogleCallback',
  data () {
    return {
      authenticated: false,
      attemptedAuthentication: false
    }
  },
  mounted () {
    this.$http.post('http://localhost:3000/v1/auth/jwt', {
      shortLivedToken: this.$route.query.shortLivedToken
    }).then(response => {
      this.attemptedAuthentication = true
      this.authenticated = true
      setUserProfile(response.data.user)
      setAccessToken(response.data.token.accessToken)
      this.$router.replace('/timeline')
    }).catch(response => {
      this.attemptedAuthentication = true
    })
  }
}
</script>

<style>
  .container {
    padding: 40px 0
  }
  .continue-btn {
    padding: 20px;
    background: rgba(16, 16, 235, 0.534);
    border-radius: 3px;
    width: 200px;
    color: white;
    font-size: 18px;
  }
</style>
