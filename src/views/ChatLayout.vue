<template>
  <div class="my-container">
    <div class="bg-color">
    </div>
    <div class="chat-window">
      <div class="thread-container"></div>
      <div class="chat-container"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ChatLayout'
}
</script>

<style scoped>

.my-container {
  height: 87vh;
  background-color: hsl(60, 11%, 84%);
}

.bg-color {
  background-color: hsl(153, 47%, 49%);
  height: 12%;
  padding: 1px;
}

.chat-window {
  display: grid;
  grid-template-columns: 30% 70%;
  width: 1400px;
  min-height: 460px;
  height: calc(82vh - 1px);
  border: 1px solid hsl(108, 4%, 76%);
  background: hsl(0, 0%, 100%);
  margin: -4% auto 0%;
}

.thread-container{
  height: 100%;
  background-color: hsl(27, 74%, 50%);
}

.chat-container{
  height: 100%;
  background-color: hsl(210, 8%, 45%);
}

@media screen and (max-width: 1440px) and (min-width: 1301px) {
  .my-container {
    background: unset;
    border: unset;
  }

  .bg-color {
    display: none;
  }

  .chat-window {
    width: 100%;
    height: 100%;
    margin: 0;
  }
}

@media screen and (max-width: 1300px) and (min-width: 901px) {
  .bg-color {
    display: none;
  }
  .chat-window{
    grid-template-columns: 32% 68%;
    width: 100%;
    height: 100%;
    margin: 0;
  }
}

@media screen and (max-width: 900px) {
  .bg-color {
    display: none;
  }
  .chat-window{
    grid-template-columns: minmax(300px,40%) minmax(348px,60%);
    width: 100%;
    height: 100%;
    margin: 0;
  }
}

</style>
