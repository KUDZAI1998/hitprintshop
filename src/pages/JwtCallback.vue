<template>
  <div class="container">
    <div v-if="authenticated">
      <h3 class="title mb-5">You have successfully been logged in.</h3>

      <div v-if="!createdUsername && isNewUser">
        <p> Now you must create a new username <br>
          <input type="text" class="form-control" v-model="username" placeholder="username e.g kudapara">
        </p>
        <button class="continue-btn" @click="setUsername"> Create Username <v-icon class="white--text">check_circle</v-icon> </button>
      </div>
      <div v-else>
        <p>You have successfully created a username</p>
        <button class="continue-btn" @click="$router.push('/timeline')"> Continue to app <v-icon class="white--text">arrow_forward</v-icon> </button>
      </div>
    </div>
    <p v-if="!authenticated && !attemptedAuthentication">Finishing up the authentication process....</p>
    <p v-if="!authenticated && attemptedAuthentication">
      The system failed to sign you in. <br>
      <button class="continue-btn" @click="$router.push('/login')"> Login Again <v-icon class="white--text">lock_open</v-icon> </button>
    </p>
  </div>
</template>

<script>
import { setUserProfile, setAccessToken, setTokenObject, getUserProfile, getTokenObject } from '@/utils/auth'
export default {
  name: 'GoogleCallback',
  data () {
    return {
      authenticated: false,
      attemptedAuthentication: false,
      username: '',
      createdUsername: false
    }
  },
  mounted () {
    this.$http.post('/auth/jwt', {
      shortLivedToken: this.$route.query.shortLivedToken
    }).then(response => {
      this.attemptedAuthentication = true
      this.authenticated = true
      setUserProfile(response.data.user)
      setTokenObject(response.data.token)
      setAccessToken(response.data.token.accessToken)
      if (!this.isNewUser) this.$router.replace('/timeline')
    }).catch(response => {
      this.attemptedAuthentication = true
    })
  },
  methods: {
    setUsername () {
      const authHeader = `${getTokenObject().tokenType} ${getTokenObject().accessToken}`
      this.$http.patch(
        `/users/${getUserProfile().id}`,
        { username: this.username },
        { headers: {
          Authorization: authHeader
        }}
      ).then(response => {
        const updatedUser = getUserProfile()
        updatedUser.username = this.username
        setUserProfile(updatedUser)
        this.createdUsername = true
      }).catch(error => {
        console.log(JSON.stringify(error))
      })
    }
  },
  computed: {
    isNewUser () { return this.$route.query.isNewUser === 'true' }
  }
}
</script>

<style>
  .container {
    padding: 40px
  }
  .continue-btn {
    padding: 20px;
    background: rgba(16, 16, 235, 0.534);
    border-radius: 3px;
    min-width: 350px;
    color: white;
    font-size: 18px;
  }
  .form-control{
    border: gray 1px solid;
    border-radius: 3px;
    background: #fff;
    padding: 10px;
    margin-top: 10px;
    min-width: 350px;
  }
</style>
