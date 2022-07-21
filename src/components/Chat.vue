<template>
    <div :class="chatSelection">
    <div class="img-col">
      <img src="../../public/no-profile-picture-icon-24.webp">
    </div>
    <div class="d-flex flex-column justify-content-center info-col col">
      <div class="row m-0 name-row">
        <p v-if="name!==null" class="col chat-name">{{ name }}</p>
        <p v-else-if="participants.length===1" class="col chat-name">{{ participants.join() }}</p>
        <p v-else class="col chat-name">{{ participants[0]+ participants.length-1 + 'others' }}</p>
        <p class="time">{{last_updated}}</p>
      </div>
      <div class="row m-0 message-row">
        <!--   test data: 'govi:'     -->
        <p class="name"></p>
        <!--    test data: 'this is a text'    -->
        <p class="col px-0"></p>
        <!--    test data: 'mut'    -->
        <p class="time"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  props: {
    name: String,
    threadid: Number,
    selected: Number,
    participants: Array,
    last_updated: String
  },
  computed: {
    chatSelection () {
      return (this.threadid === this.selected) ? 'row m-0 col chat chat-selection' : 'row m-0 col chat'
    }
  }
}
</script>

<style scoped>

*{
  font-size: 14px;
}

p{
  margin: 0;
}

.time{
  padding: 0;
  width: fit-content;
  color: hsl(0, 0%, 64%);
}

.chat{
  height: 72px;
}

.chat-name{
  font-size: 17px;
  font-weight: 600;
}

.chat-selection{
  background-color: hsl(0, 0%, 92%);
}

.name{
  width: fit-content;
}
.img-col{
  width: 77px;
  padding: 11px 15px 0 13px;
}
.info-col{
  width: 235px;
  padding: 0;
  border-bottom: 1px solid hsl(0, 0%, 95%);
}

img{
  border-radius: 25px;
  height: 48px;
}
</style>
