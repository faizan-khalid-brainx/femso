<template>
  <div class="chat-background">
    <div class="container chat-window px-0">
      <!--   Header   -->
      <div class="row mx-0 chat-window-header">
        <!--   CHAT CONTAINER     -->
        <div class="message-container px-0">
        </div>
        <!--    MESSAGE CONTAINER    -->
        <div class="col h-100 px-0">
        </div>
      </div>
      <div class="row mx-0" style="height: 90.5%">
        <!--   CHAT CONTAINER     -->
        <div class="message-container px-0">
        </div>
        <!--    MESSAGE CONTAINER    -->
        <div class="d-flex flex-column flex-column-reverse col h-100  px-0">
          <div class="text-container p-1">
            <textarea type="text" id="chat-input" placeholder="Type your message"></textarea>
          </div>
          <div class="d-flex flex-column flex-column-reverse message-window">
          </div>
        </div>
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

.chat-window {
  margin-top: 2.5%;
  height: 82vh;
  background-color: hsl(0, 0%, 100%);
}

@media (max-width: 767px) {
  .chat-window {
    margin-top: -1px;
  }
}

.message-container {
  min-width: 380px;
  max-width: 420px;
  content-size: border-box;
  /*background-color: hsl(210, 29%, 60%);*/
}

.chat-background {
  position: static;
  /* Avoids border collapse */
  padding: 1px 0 0 0;
  margin: 0;
  background-color: hsl(153, 47%, 49%);
  height: 20vh;
}

.text-container {
  height: 62px;
  background-color: hsl(0, 0%, 94%);
}

.chat-window-header {
  height: 60px;
  background-color: hsl(0, 0%, 94%);
}

#chat-input {
  width: 90%;
  resize: none;
  overflow-y: hidden; /* Hide vertical scrollbar */
  border-radius: 21px;
  border: 1px solid hsl(0, 0%, 94%);
  height: 40px;
  margin: 5px 10px;
  padding: 9px 12px 11px;
}

.message-window{
  background-image: url("../../public/bg_img.png");
  height: 100%;
}

</style>
