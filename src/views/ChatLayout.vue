<template>
  <div class="chat-background">
    <div class="container chat-window">
      <div class="chat-messages">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatLayout'
}
</script>

<style scoped>

.chat-window{
  margin-top: 2.5%;
  height: 82vh;
  background-color: hsl(0, 0%, 100%);
  z-index: 1;
}

@media (max-width: 767px) {
  .chat-window{
    margin-top: -1px;
  }
}

.chats-message{
  min-width: 380px;
  max-width: 420px;
  content-size: border-box;
}

.chat-background{
  position: static;
  /* Avoids border collapse */
  padding: 1px 0 0 0;
  margin: 0;
  background-color: hsl(153, 47%, 49%);
  height: 20vh;
}

</style>
