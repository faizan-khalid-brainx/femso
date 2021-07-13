<template>
  <div class="login">
    <div id="viewPanel" class="d-flex align-items-center justify-content-center">
      <form class="bg-light w-50" @submit.prevent="formSubmit()">
        <h1 class="text-center w-100">
          Login
        </h1>
        <div>
          <hr/>
          <div class="d-flex flex-column px-5">
            <label class="mt-3" for="uname"><strong>Username</strong></label>
            <input v-model="email" type="text" autocomplete="off" placeholder="Username" id="uname" required
                   class="d-block input-group">
            <label class="mt-3" for="psw"><strong>Password</strong></label>
            <input v-model="password" type="password" placeholder="Password" id="psw" required
                   class="d-block input-group">
            <button type="submit" class="btn btn-primary my-3">Login</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async formSubmit () {
      if (this.email !== '' && this.password !== '') {
        const payload = {
          email: this.$data.email,
          password: this.$data.password
        }
        let request
        try {
          request = await (axios.post('http://127.0.0.1:8000/api/login', payload))
        } catch (ex) {
          console.log(ex)
        }
        if (request.status === 200) {
          window.localStorage.setItem('api_token', request.data.token)
        }
        window.location = '/' // rerender the page for navbar
      }
    }
  }
}
</script>

<style scoped>
* {
  font-family: sans-serif;
}

.login {
  background-color: #42b983;
  width: 100vw;
  height: 100vh;
}

input {
  border-radius: 5px;
}

#viewPanel {
  height: 60vh;
}
</style>
