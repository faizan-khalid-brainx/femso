<template>
  <div class="container">
    <question-heading
      :title="'All Questions'">
    </question-heading>
    <div class="row">
      <h2 id="count">{{ questions.length }} questions</h2>
    </div>
    <div class="w-100 line-end">
    </div>
    <div v-for="question in questions" :key="'question' + question.id">
      <question-view
        :questionTitle="question.title"
        :questionLink="'/question/' + question.id"
        :questionContent="question.content"
        :voteCount="question.user_votes_count"
        :answerCount="question.answers_count"
        :questionDate="question.created_at"
        :name="question.user.name"
        :profileLink="'#'"
        imageLink="prop.jpeg"
      ></question-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import QuestionHeading from '@/components/QuestionHeading'
import QuestionView from '@/components/QuestionView'
import axios from 'axios'

export default {
  name: 'Home',
  async created () {
    this.$data.questions = await this.getQuestions()
  },
  components: {
    QuestionView,
    QuestionHeading
  },
  data () {
    return {
      questions: []
    }
  },
  methods: {
    async getQuestions () {
      try {
        const { data } = await axios.get('http://127.0.0.1:8000/api/show-question')
        return data.questions
      } catch (exception) {
        console.log(exception)
      }
      console.log('Unable to fetch Questions')
      return []
    }
  }
}
</script>

<style scoped>
#count {
  font-size: 1.30769231rem;
}

.line-end {
  border-bottom: #d6d9dc 1px solid;
}

</style>
