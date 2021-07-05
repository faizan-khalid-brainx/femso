<template>
  <!--  <div class="home">-->
  <!--    <img alt="Vue logo" src="../assets/logo.png">-->
  <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <!--  </div>-->
  <div class="container">
    <question-heading
      :title="'Is there a reliable language model/package that can accurately identify Country/city from unstructured text?'">
    </question-heading>
    <div class="row">
      <h2 id="count">21,434,448 questions</h2>
    </div>
    <div class="w-100 line-end">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import QuestionHeading from '@/components/QuestionHeading'

export default {
  name: 'Home',
  components: { QuestionHeading }

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
