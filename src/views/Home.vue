<template>
  <!--  <div class="home">-->
  <!--    <img alt="Vue logo" src="../assets/logo.png">-->
  <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <!--  </div>-->
  <div class="container">
    <question-heading
      :title="'All Questions'">
    </question-heading>
    <div class="row">
      <h2 id="count">{{ 0 }} questions</h2>
    </div>
    <div class="w-100 line-end">
    </div>
    <question-view
    :questionTitle="''"
    :questionLink="''"
    :questionContent="''"
    :voteCount="0"
    :answerCount="0"
    :questionDate="''"
    :name="''"
    :profileLink="''"
    :imageLink="''"
    ></question-view>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import QuestionHeading from '@/components/QuestionHeading'
import QuestionView from '@/components/QuestionView'

export default {
  name: 'Home',
  components: { QuestionView, QuestionHeading },
  props: {
    questionTitle: String, // components for the question view component
    questionLink: String,
    questionContent: String,
    voteCount: Number,
    answerCount: Number,
    questionDate: String,
    name: String, // content for the profile component
    profileLink: String,
    imageLink: String
  }

  // components: {
  //   HelloWorld
  // }
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
