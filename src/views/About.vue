<template>
  <div class="about">
    <div class="container">
      <question-heading
        :title="'How to determine the type without instantiating the object?'"
        :link="'#'">
      </question-heading>
      <div class="w-100 line-end"></div>
      <question-component></question-component>
      <div class="" style="margin-left: 8%; border-bottom: #eff0f1 1px solid"></div>
      <!-- Answer Row -->
      <div class="p-4">
        <h2>{{ count }} Answer</h2>
      </div>
      <question-component></question-component>
      <div class="" style="border-bottom: #eff0f1 1px solid"></div>
      <h2 class="py-4 ">Your Answer </h2>
      <form>
        <textarea class="w-100" rows="6"></textarea>
        <button class="mt-4 btn btn-primary">Post Your Answer</button>
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
</style>
<script>
import QuestionHeading from '@/components/QuestionHeading'
import QuestionComponent from '@/components/QuestionComponent'

export default {
  components: { QuestionComponent, QuestionHeading }
}
</script>
