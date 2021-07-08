<template>
  <div>
    <strong>
      {{ count }}
    </strong>
    <div>
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Stats',
  props: {
    count: Number,
    item: String
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

</style>
