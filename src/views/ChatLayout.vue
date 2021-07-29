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
      <div class="row mx-0" style="height: calc(100% - 60px)">
        <!--   CHAT CONTAINER     -->
        <div class="message-container px-0">
          <div v-for="thread in threads" :key="'thread'+thread.id">
            <chat @click="registerThreadClick(thread.id)" :name="thread.thread_name" :threadid="thread.id"/>
          </div>
          <div v-if="!threads" class="d-flex flex-column justify-content-center h-100">
            <h5 class="text-center">No threads here, Its kind'a lonely</h5>
          </div>
        </div>
        <!--    MESSAGE CONTAINER    -->
        <div v-if="selectedId" class="d-flex flex-column flex-column-reverse col h-100  px-0">
          <div class="text-container p-1">
            <textarea type="text" id="chat-input" placeholder="Type your message"></textarea>
          </div>
          <div class="d-flex flex-column flex-column-reverse message-window">
            <div v-for="message in messages" :key="'message'+message.id">
              <text-message :name="message.user.name" :message="message.content"
                            :owner="userId===message.user.id" :time="message.sent"/>
            </div>
          </div>
        </div>
        <div v-else class="d-flex flex-column justify-content-center col h-100  px-0"
             style="border-left: 1px solid #d9d9d9">
          <h3 class="text-center">Select a thread to Open Messages</h3>
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
      selectedId: null
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
    }
  }
}
</script>

<style scoped>

.chat-window {
  margin-top: 2.5%;
  height: 82vh;
  background-color: hsl(0, 0%, 100%);
  border: 1px solid hsl(108, 4%, 76%);
}

@media (max-width: 767px) {
  .chat-window {
    margin-top: -1px;
  }
}

.message-container {
  min-width: 380px;
  max-width: 420px;
  height: 100%;
  content-size: border-box;
  overflow-y: scroll;
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

.message-window {
  background-image: url("../../public/bg_img.png");
  height: 100%;
  overflow-y: scroll;
}

.chat-window-header > div {
  border: 1px solid hsl(0, 0%, 85%);
}

</style>
