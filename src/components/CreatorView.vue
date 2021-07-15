<template>
  <div class="d-flex justify-content-end">
    <div id="face">
      <a v-if="imageLink" :href="profileLink"><img :src="imageLink" alt="person image"></a>
    </div>
    <div class="px-0">
      <a :href="profileLink">{{ name }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreatorView',
  props: {
    name: String,
    profileLink: String,
    imageLink: String
  }
}
</script>
<style scoped>

</style>
