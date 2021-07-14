<template>
  <div v-if="isAuthenticated" id="nav">
    <router-link to="/">Home</router-link>
    |
    <a href="" @click.prevent="logout()">Logout</a>
  </div>
  <router-view/>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  computed: {
    isAuthenticated () {
      const returnable = window.localStorage.getItem('api_token')
      return returnable == null ? 0 : 1
    }
  },
  beforeMount () {
    if (!this.isAuthenticated) {
      this.$router.replace('login')
    }
  },
  methods: {
    async logout () {
      try {
        await axios.get('http://127.0.0.1:8000/api/logout', {
          headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('api_token')
          }
        })
        window.location = '/' // reload is required to hide the navbar
      } catch (error) {
        if (error.response.status === 401) {
          console.error(error.response.data.message)
          window.localStorage.removeItem('api_token')
          window.location = '/'
        } else {
          console.error(error.message)
        }
      }
    }
  }
}
</script>

<style lang="scss">

html {
  font-size: 16px;
}

/* mobile devices (mobile, 544px and below) The navbar toggle appears at this breakpoint */
@media (max-width: 544px) {
  html {
    font-size: 8px;
  }
}

/* mobile devices (mobile, 544px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 544px) {
  html {
    font-size: 10px;
  }
}

/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) {
  html {
    font-size: 12px;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  html {
    font-size: 14px;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  html {
    font-size: 15px;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
