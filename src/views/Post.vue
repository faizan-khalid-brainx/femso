<template>
  <div class="post">
    <div class="container">
      <question-heading
        :title="question.title"
        :link="'/question/' + question.id">
      </question-heading>
      <div class="w-100 line-end"></div>
      <question-component
        :body="question.content"
        :user="question.user"
        :vote="voteCount(question.vote)"
        :question-date="question.created_at"
      >
      </question-component>
      <div class="hr"></div>
      <!-- Answer Row -->
      <div class="p-4">
        <h2>{{ answers.length }} Answer</h2>
      </div>
      <div v-for="answer in answers" :key="'answer' + answer.id">
        <question-component
          :body="answer.content"
          :user="answer.user"
          :vote="voteCount(answer.vote)"
          :question-date="answer.created_at"
        ></question-component>
        <div class="hr"></div>
        <div class="line-end"></div>
      </div>
      <h2 class="py-4 ">Your Answer </h2>
      <form @submit.prevent="formSubmit()">
        <textarea v-model="content" class="w-100" rows="6"></textarea>
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
import axios from 'axios'

export default {
  components: {
    QuestionComponent,
    QuestionHeading
  },
  data () {
    return {
      question: {},
      answers: [],
      content: ''
    }
  },
  async created () {
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
    async getPost () {
      try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/questionPost?id= + ${this.$route.params.id}`)
        return data
      } catch (exception) {
        console.log(exception)
      }
      console.log('Unable to fetch Post')
      return {
        question: null,
        answers: []
      }
    },
    async formSubmit () {
      console.log('form being submitted')
      const payload = {
        content: this.content,
        question_id: this.$route.params.id
      }
      const { data } = await (axios.post('http://127.0.0.1:8000/api/answer', payload, {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('api_token')
        }
      }))
      console.log(data)
      await this.fetchData()
    },
    async fetchData () {
      const data = await this.getPost()
      this.$data.question = data.question
      this.$data.answers = data.answers
      this.content = ''
    }
  }
}
</script>
