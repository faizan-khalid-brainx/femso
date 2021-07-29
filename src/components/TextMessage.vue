<template>
 <div class="text-window">
   <div class="triangle-topright"></div>
   <div class="message-row">
     <div class="row mx-0">
       <span class="name">03424242202</span>
     </div>
     <div class="row mx-0">
       <span class="message">this is the message</span>
     </div>
     <div class="row mx-0">
       <span class="time">12:00 am</span>
     </div>
   </div>
 </div>
</template>

<script>
export default {
  name: 'TextMessage'
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
.message-row{
  display: inline-block;
  border-top:0px solid transparent ;
  background-color: white;
  max-width: 502px;
  min-width: 94px;

}
.text-window {
}
.name{
  font-size: 13px;
}

.message{
  font-size: 14px;
}

.time{
  margin-left: auto;
  font-size: 11px;
  width: fit-content;
  color: hsl(0, 0%, 64%);
}
</style>
