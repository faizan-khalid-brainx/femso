<template>
  <div class="my-container">
    <div class="bg-color">
    </div>
    <div class="chat-window">
      <div class="thread-container">
        <div class="container-header"></div>
        <div class="container-body">
          <div v-for="thread in threads" :key="'thread'+thread.id">
            <chat @click="registerThreadClick(thread.id)" :name="thread.thread_name"
                  :threadid="thread.id" :selected="selectedId"/>
          </div>
          <div v-if="!threads" class="d-flex flex-column justify-content-center h-100">
            <h5 class="text-center">No threads here, Its kinda lonely</h5>
          </div>
        </div>
      </div>
      <div class="chat-container">
        <div class="container-header"></div>
        <div class="container-body">
          <!--     BODY CONTENT     -->
          <div v-if="selectedId" class="d-flex flex-column-reverse overflow-hidden col h-100  px-0">
            <div class="text-container p-1">
              <textarea @keypress.enter.prevent="sendMessage" v-model="text" type="text" id="chat-input" placeholder="Type your message"></textarea>
              <img @click="sendMessage" id="sendImage" src="../../public/icons8-email-send-48.png" alt="Send Button">
            </div>
            <div class="message-window">
              <template v-for="message in messages" :key="'message'+message.id">
                <text-message :name="message.user.name" :message="message.content"
                              :owner="userId===message.user.id" :time="message.sent"/>
              </template>
            </div>
          </div>
          <div v-else class="d-flex flex-column justify-content-center col h-100  px-0"
               style="border-left: 1px solid #d9d9d9">
            <h3 class="text-center">Select a thread to Open Messages</h3>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Chat from '@/components/Chat'
import TextMessage from '@/components/TextMessage'
import axios from 'axios'

export default {
  name: 'ChatLayout',
  components: {
    TextMessage,
    Chat
  },
  data () {
    return {
      loginState: {
        Boolean,
        default: false
      },
      userId: Number,
      threads: Array,
      messages: Array,
      selectedId: null,
      text: ''
    }
  },
  computed: {
    isAuthenticated () {
      const returnable = window.localStorage.getItem('api_token')
      return returnable == null ? 0 : 1
    }
  },
  async created () {
    await this.checkLogin()
    this.threads = null
    this.getThreads()
  },
  methods: {
    getThreads () {
      axios.get('http://127.0.0.1:8000/api/chat', {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('api_token')
        }
      }).then(response => {
        this.threads = response.data.threads
        this.userId = response.data.user_id
      })
        .catch(error => console.log(error.response.code))
    },
    login () {
      this.$router.push('/login')
    },
    async checkLogin () {
      try {
        await (axios.get('http://127.0.0.1:8000/api/user', {
          headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('api_token')
          }
        }))
        this.loginState = true
      } catch (error) {
        if (error.response.status === 401) {
          console.error(error.response.data.message)
          window.localStorage.removeItem('api_token')
          this.loginState = false
          this.login()
        } else {
          console.error(error.message)
        }
      }
    },
    registerThreadClick (threadId) {
      this.selectedId = threadId
      this.fetchThreadMessages()
    },
    fetchThreadMessages () {
      axios.get(`http://127.0.0.1:8000/api/thread-message/${this.selectedId}`, {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('api_token')
        }
      }).then(response => (this.messages = response.data.messages))
        .catch(error => console.log(error.response.message))
    },
    sendMessage () {
      const payload = {
        content: this.text,
        thread_id: this.selectedId
      }
      axios.post('http://127.0.0.1:8000/api/message/', payload, {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('api_token')
        }
      }).then(response => {
        console.log(response.data.message)
        this.text = ''
        this.fetchThreadMessages()
      })
        .catch(error => console.log(error.response.message))
    }
  }
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
  margin: -4% auto 0;
}

.thread-container{
  height: 100%;
  border-right: 1px solid hsl(0, 0%, 85%);
}

.chat-container{
  height: 100%;
  border-right: 1px solid hsl(0, 0%, 85%);
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

.container-header{
  background-color: hsl(0, 0%, 93%);
  height: 60px;
  width: 100%;
}

.container-body{
  height: calc(100% - 60px);
  border-top: 1px solid hsl(0, 0%, 86%);
}

.text-container {
  height: 62px;
  background-color: hsl(0, 0%, 94%);
}

#chat-input {
  font-size: 14px;
  width: calc(100% - 60px);
  resize: none;
  overflow: hidden; /* Hide vertical scrollbar */
  border-radius: 21px;
  border: 1px solid hsl(0, 0%, 94%);
  height: 40px;
  margin: 5px 10px;
  padding: 9px 12px 11px;
}

#sendImage {
  width: 32px;
  margin-bottom: 28px;
}

.message-window{
  display: flex;
  flex-direction: column;
  justify-content: end;
  background-image: url("../../public/bg_img.png");
  height: calc(100% - 62px);
  overflow-y: scroll;
}

</style>
