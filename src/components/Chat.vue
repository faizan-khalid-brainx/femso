<template>
    <div :class="chatSelection">
    <div class="img-col">
      <img src="../../public/no-profile-picture-icon-24.webp">
    </div>
    <div class="d-flex flex-column justify-content-center info-col col">
      <div class="row m-0 name-row">
        <p class="col" style="font-size: 17px; font-weight: 600">{{ name }}</p>
<!--        <p class="time">12:00 PM</p>-->
      </div>
<!--      <div class="row m-0 message-row">-->
<!--        <p class="name">govi: </p>-->
<!--        <p class="col px-0">this is a text</p>-->
<!--        <p class="time">mut</p>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  props: {
    name: String,
    threadid: Number,
    selected: Number
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
