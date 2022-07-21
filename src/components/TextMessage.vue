<template>
  <div v-if="name" :class="ownerWindow">
    <div v-if="!owner" class="triangle-topright"></div>
    <div :class="ownerTextContainer">
      <div class="row mx-0">
        <span class="name" style="color: hsl(250,50%,50%)">{{ name }}</span>
      </div>
      <div class="row mx-0">
        <span class="message"> {{ message }} </span>
      </div>
      <div class="row mx-0">
        <span class="time">{{ time }}</span>
      </div>
    </div>
    <div v-if="owner" class="triangle-topleft"></div>
  </div>
</template>

<script>
export default {
  name: 'TextMessage',
  props: {
    name: String,
    message: String,
    time: String,
    owner: {
      Boolean,
      default: true
    }
  },
  computed: {
    ownerTextContainer () {
      return (this.owner) ? 'message-row own' : 'message-row'
    },
    ownerWindow () {
      return (this.owner) ? 'text-window right' : 'text-window'
    }
  }
}
</script>

<style scoped>
.triangle-topright {
  width: 0;
  height: 0;
  border-top: 13px solid white;
  border-left: 8px solid transparent;
  display: inline-block;
}

.triangle-topleft {
  width: 0;
  height: 0;
  border-top: 13px solid hsl(94, 78%, 87%);
  border-right: 8px solid transparent;
  display: inline-block;
}

.message-row {
  display: inline-block;
  border-top: 0px solid transparent;
  background-color: white;
  max-width: 502px;
  min-width: 94px;
}

.text-window {
}

.name {
  font-size: 13px;
}

.message {
  font-size: 14px;
}

.own {
  background-color: hsl(94, 78%, 87%);
}

.right{
  align-self: end;
}

.time {
  margin-left: auto;
  font-size: 11px;
  width: fit-content;
  color: hsl(0, 0%, 64%);
}
</style>
