<template>
  <div>
    <a class="upvote d-block">Up</a>
    <strong>
      {{ Votes }}
    </strong>
    <a class="upvote d-block">Down</a>
  </div>
</template>

<script>
export default {
  props: {
    Votes: {
      Number,
      default: 0
    }
  }
}
</script>

<style scoped>

* {
  text-align: center;
}

strong {
  font-size: 1.30769231rem;;
}

a, a:link, a:visited, a:hover, a:active {
  text-decoration: none;
  color: #bbc0c4;
}

</style>
