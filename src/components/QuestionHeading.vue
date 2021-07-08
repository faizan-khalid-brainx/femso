<template>
  <div class="row mx-0">
    <div class="col-9 px-0">
      <div v-if="link">
        <a :href="link"><h1>
          {{ title }}
        </h1></a>
      </div>
      <div v-else>
        <h1>
          {{ title }}
        </h1>
      </div>
    </div>
    <div class="col px-0">
      <div class="float-end">
        <div id="button" class="btn btn-primary">
          <router-link style="color: white" to="/question">Ask Question</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionHeading',
  props: {
    title: String,
    link: String
  }
}
</script>

<style scoped>
h1 {
  font-size: 2.07692308rem;
  line-height: 1.35;
  margin-bottom: 0;
}

#button {
  font-size: 13px;
}

a:link, a:visited, a:hover, a:link {
  text-decoration: none;
  color: #3c4146;
}

</style>
