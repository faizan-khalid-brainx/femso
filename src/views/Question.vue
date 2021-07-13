<template>
  <div class="question">
    <div id="bg-question" class="container-fluid">
      <div class="container">
        <div class="row mx-0">
          <h1 id="headline" class="col-6 d-flex">
            <span class="align-self-center">Ask a public Question</span>
          </h1>
          <img class="col-6" src="https://cdn.sstatic.net/Img/ask/background.svg?v=2e9a8205b368" alt="background image">
        </div>
      </div>
      <div style="background-color: white" class="container">
        <form class="p-5" method="POST" :action="'#'">
          <label for="title">
            <strong>Title</strong>
          </label>
          <p>Be specific and imagine you’re asking a question to another person</p>
          <input class="mb-3 w-100" type="text" id="title" name="title" required autocomplete="off" v-model="title"><br>
          <label for="body">
            <strong>Body</strong>
          </label>
          <p>
            Include all the information someone would need to answer your question
          </p>
          <textarea id="body" name="body" rows="8" style="resize: none" class="w-100" v-model="body"></textarea>
          <button @click="submitForm()" class="btn btn-primary mt-3" type="button"
                  style="border-radius: 6px;letter-spacing: 2px">Publish
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Question',
  data () {
    return {
      title: '',
      body: ''
    }
  },
  computed: {
    isAuthenticated () {
      const returnable = window.localStorage.getItem('api_token')
      return returnable == null ? 0 : 1
    }
  },
  beforeMount () {
    console.log('question component mounted')
    if (!this.isAuthenticated) {
      this.$router.replace('login')
    }
  },
  methods: {
    async submitForm () {
      const payload = {
        title: this.title,
        content: this.body
      }
      const { data } = await (axios.post('http://127.0.0.1:8000/api/question', payload, {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('api_token')
        }
      }))
      console.log(data)
      await this.$router.replace('/')
    }
  }
}
</script>

<style scoped>
#bg-question {
  background-color: #eff0f1;
  width: 100vm;
  height: 100vh;
}

#headline {
  font-size: 2.07692308rem
}
</style>
