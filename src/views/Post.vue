<template>
  <div class="post">
    <div class="container">
      <question-heading v-if="question"
                        :title="question.title"
                        :link="'/question/' + question.id">
      </question-heading>
      <div class="w-100 line-end"></div>
      <question-component v-if="question" @refresh-data="fetchData"
                          :body="question.content"
                          :user="question.user"
                          :vote="voteCount(question.vote)"
                          :question-date="question.created_at"
                          :vote-button="question.isVoted"
                          :id="question.id"
                          :is-question="true"
                          :login-id="loginId"
      ></question-component>
      <div class="hr"></div>
      <!-- Answer Row -->
      <div class="p-4">
        <h2>{{ answers.length }} Answer</h2>
      </div>
      <div v-for="answer in answers" :key="'answer' + answer.id">
        <question-component @refresh-data="fetchData"
                            :body="answer.content"
                            :user="answer.user"
                            :vote="voteCount(answer.vote)"
                            :question-date="answer.created_at"
                            :vote-button="answer.isVoted"
                            :id="answer.id"
                            :login-id="loginId"
        ></question-component>
        <div class="hr"></div>
        <div class="line-end"></div>
      </div>
      <h2 class="py-4 ">Your Answer </h2>
      <form @submit.prevent="formSubmit()">
        <ckeditor :editor="editor" v-model="editorData" :confg="editorConfig"/>
        <button type="submit" class="mt-4 btn btn-primary">Post Your Answer</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.line-end {
  border-bottom: #d6d9dc 1px solid;
}

h2 {
  font-size: 1.46153846rem;
}

textarea {
  resize: none;
}

.hr {
  border-bottom: #eff0f1 1px solid;
  margin-left: 8%;
}
</style>
<script>
import QuestionHeading from '@/components/QuestionHeading'
import QuestionComponent from '@/components/QuestionComponent'
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import axios from 'axios'

export default {
  components: {
    QuestionComponent,
    QuestionHeading,
    ckeditor: CKEditor.component
  },
  data () {
    return {
      question: undefined,
      answers: [],
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        // The configuration of the editor.
      },
      loginId: null
    }
  },
  async created () {
    await this.getId()
    await this.fetchData()
  },
  methods: {
    voteCount (voteObject) {
      if (typeof voteObject !== 'undefined') {
        return voteObject['1'] - voteObject['0']
      } else {
        return 0
      }
    },
    async getId () {
      try {
        const { data } = await axios.get('http://127.0.0.1:8000/api/user', {
          headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('api_token')
          }
        })
        this.loginId = data.message
      } catch (exception) {
        console.log(exception.message)
      }
    },
    async getPost () {
      let apiName = 'http://127.0.0.1:8000/api/'
      if (!this.loginId) {
        apiName += 'guest/'
      }
      try {
        const { data } = await axios.get(`${apiName}questionPost?id= + ${this.$route.params.id}`, {
          headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('api_token')
          }
        })
        return data
      } catch (exception) {
        console.log(exception.message)
      }
      console.log('Unable to fetch Post')
      return {
        question: null,
        answers: []
      }
    },
    async formSubmit () {
      console.log('form being submitted') // Debug code
      if (this.loginId) {
        const payload = {
          content: this.editorData,
          question_id: this.$route.params.id
        }
        try {
          await (axios.post('http://127.0.0.1:8000/api/answer', payload, {
            headers: {
              Authorization: 'Bearer ' + window.localStorage.getItem('api_token')
            }
          }))
          await this.fetchData()
        } catch (error) {
          console.error(error.message)
        }
      } else {
        this.$router.push('/login')
      }
    },
    async fetchData () {
      const data = await this.getPost()
      this.question = data.question
      this.answers = data.answers
      this.editorData = '' // Clears the answer body after form submission
    }
  }
}
</script>
