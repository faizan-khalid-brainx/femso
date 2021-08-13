<template>
  <div class="my-container">
    <div class="bg-color">
    </div>
    <div class="chat-window">
      <div class="thread-container">
        <div id="addgroup" :class="{ 'd-none': addGroup, 'parent-height':true}">
          <div class="newChat-header">
            <div class="d-flex justify-content-center w-100 h-75 p-3">
              <h4 @click="groupToConversation" id="donebtn" class="btn">Done</h4>
            </div>
            <div class="h-25 row mx-0">
              <img @click="gotoMakeConversation" id="backArrow"
                   title="back" src="../../public/icons8-left-arrow-64.png">
              <h5>Add Group Participants</h5>
            </div>
          </div>
          <div class="newChat-body scrollable-y">
            <div id="nameContainer" style="height: 40%" class="scrollable-y">
              <input v-model="groupName" class="row m-0 px-5 w-100" placeholder="Group Name">
              <template v-for="grp in group" :key="'group'+grp">
                <p class="row m-0 px-5">{{ users[grp].name }}</p>
              </template>
            </div>
            <div id="" style="height: 60%" class="scrollable-y">
              <template v-for="(user,index) in users" :key="'user'+user.id">
                <chat @click="group = toggle(group,index)" :id="user.id" :name="user.name"/>
              </template>
            </div>
          </div>
        </div>
        <div id="newchat" :class="{ 'd-none': newChat, 'parent-height':true}">
          <div class="newChat-header">
            <div class="d-flex justify-content-center w-100 h-75 p-3">
            </div>
            <div class="h-25 row mx-0">
              <img @click="[addGroup,newChat,threadView]=[1,1,0]"
                   title="back" id="backArrow" src="../../public/icons8-left-arrow-64.png">
              <h5>New Thread</h5>
            </div>
          </div>
          <div class="newChat-body scrollable-y">
            <chat @click="[addGroup,newChat,threadView]=[0,1,1]"
                  title="Create a Group Thread" style="background-color: whitesmoke"
                  name="New Group"/>
            <template v-for="user in users" :key="'user'+user.id">
              <chat @click="gotoConversation(user.id)" :id="user.id" :name="user.name"/>
            </template>
          </div>
        </div>
        <div id="threadview" :class="{ 'd-none': threadView, 'parent-height':true}">
          <div class="container-header">
            <img @click="[addGroup,newChat,threadView]=[1,0,1]" id="newMessage" title="Create a Thread"
                 src="../../public/chat.png">
          </div>
          <div class="container-body scrollable-y">
            <div v-for="thread in threads" :key="'thread'+thread.id">
              <chat title="Open Thread" @click="registerThreadClick(thread.id)" :name="thread.thread_name"
                    :threadid="thread.id" :selected="selectedId"
                    :participants="thread.names" :last_updated="thread.updated_at"/>
            </div>
            <div v-if="!threads" class="d-flex flex-column justify-content-center h-100">
              <h5 class="text-center">No threads here, Its kinda lonely</h5>
            </div>
            <div v-else-if="!threads.length" class="d-flex flex-column justify-content-center h-100">
              <h5 class="text-center">No threads here, Its kinda lonely</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="chat-container">
        <div class="container-header"></div>
        <div class="container-body">
          <!--     BODY CONTENT     -->
          <div v-if="selectedId" class="d-flex flex-column-reverse col h-100  px-0">
            <div class="text-container p-1">
              <textarea @keypress.enter.prevent="sendMessage" v-model="text" type="text" id="chat-input"
                        placeholder="Type your message"></textarea>
              <img @click="sendMessage" id="sendImage" title="Send" src="../../public/icons8-email-send-48.png"
                   alt="Send Button">
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
// import Echo from 'laravel-echo'

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
      text: '',
      addGroup: true,
      newChat: true,
      threadView: false,
      users: [],
      group: [],
      groupName: ''
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
    this.fetchUser()
    window.Echo.channel('message-update')
      .listen('NewMessage', (e) => {
        this.fetchThreadMessages()
        console.log('event occurred', e)
      })
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
    async fetchThread ($userid) {
      try {
        const { data } = await (axios.get(`http://127.0.0.1:8000/api/chat/${$userid}`, {
          headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('api_token')
          }
        }))
        return data.threadId
      } catch (error) {
        console.error(error.message)
      }
      return null
    },
    async fetchGroupThread () {
      try {
        const participant = []
        for (const grp in this.group) {
          participant.push(this.users[grp].id)
        }
        const payload = {
          participants: participant,
          groupName: this.groupName
        }
        const { data } = await (axios.post('http://127.0.0.1:8000/api/chat/group', payload, {
          headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('api_token')
          }
        }))
        return data.threadId
      } catch (error) {
        console.error(error.message)
      }
      return null
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
          await this.$router.push('/login')
        } else {
          console.error(error.message)
        }
      }
    },
    fetchUser () {
      axios.get('http://127.0.0.1:8000/api/users/all', {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('api_token')
        }
      })
        .then(response => (this.users = response.data.users))
        .catch()
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
    },
    registerThreadClick (threadId) {
      this.selectedId = threadId
      this.fetchThreadMessages()
    },
    gotoMakeConversation () {
      this.group = [];
      [this.addGroup, this.newChat, this.threadView] = [1, 0, 1]
    },
    async gotoConversation (id) {
      this.selectedId = await this.fetchThread(id)
      this.fetchThreadMessages()
      this.getThreads();
      [this.addGroup, this.newChat, this.threadView] = [1, 1, 0]
    },
    async groupToConversation () {
      if (this.group.length) {
        this.selectedId = await this.fetchGroupThread()
        this.fetchThreadMessages()
        this.getThreads()
      }
      [this.group, this.groupName] = [[], ''];
      [this.addGroup, this.newChat, this.threadView] = [1, 1, 0]
    },
    // Courtesy of dev.to Blog
    removeAtIndex (arr, index) {
      const copy = [...arr]
      copy.splice(index, 1)
      return copy
    },
    toggle (arr, item, getValue = item => item) {
      const index = arr.findIndex(i => getValue(i) === getValue(item))
      if (index === -1) return [...arr, item]
      return this.removeAtIndex(arr, index)
    }
    // courtesy ends here :p
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
  height: 12vh;
  padding: 1px;
}

.chat-window {
  display: grid;
  grid-template-columns: 30% 70%;
  grid-auto-rows: calc(82vh - 1px);
  width: 1400px;
  min-height: 460px;
  border: 1px solid hsl(108, 4%, 76%);
  background: hsl(0, 0%, 100%);
  margin: -8vh auto 0;
}

.thread-container {
  height: 100%;
  border-right: 1px solid hsl(0, 0%, 85%);
}

.chat-container {
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
    height: inherit;
    grid-auto-rows: minmax(460px, 87vh);
    margin: 0;
  }
}

@media screen and (max-width: 1300px) and (min-width: 901px) {
  .bg-color {
    display: none;
  }

  .chat-window {
    grid-template-columns: 32% 68%;
    width: 100%;
    height: inherit;
    grid-auto-rows: minmax(460px, 87vh);
    margin: 0;
  }
}

@media screen and (max-width: 900px) {
  .bg-color {
    display: none;
  }

  .chat-window {
    grid-template-columns: minmax(300px, 40%) minmax(348px, 60%);
    width: 100%;
    height: inherit;
    grid-auto-rows: minmax(460px, 87vh);
    margin: 0;
  }
}

.container-header {
  background-color: hsl(0, 0%, 93%);
  height: 60px;
  width: 100%;
}

.container-body {
  height: calc(100% - 60px);
  border-top: 1px solid hsl(0, 0%, 86%);
}

.scrollable-y {
  overflow-y: auto;
}

.text-container {
  height: 62px;
  background-color: hsl(0, 0%, 94%);
}

#chat-input {
  font-size: 14px;
  width: calc(100% - 60px);
  resize: none;
  overflow-x: auto;
  border-radius: 21px;
  border: 1px solid hsl(0, 0%, 94%);
  height: 40px;
  margin: 5px 10px;
  padding: 9px 12px 11px;
}

#sendImage {
  width: 32px;
  margin-top: 14px;
  margin-right: 8px;
  float: right;
}

.message-window {
  display: flex;
  flex-direction: column;
  background-image: url("../../public/bg_img.png");
  height: calc(100% - 62px);
  overflow-y: auto;
}

/* below is alternative to justify content end */
/* which was breaking the scrolling functionality */
.message-window > :first-child {
  margin-top: auto !important;
}

#newMessage {
  width: 32px;
  margin-top: 14px;
  margin-right: 16px;
  float: right;
}

.newChat-header {
  background-color: hsl(172, 100%, 37%);
  height: 120px;
}

.newChat-body {
  height: calc(100% - 120px);
}

#donebtn {
  background-color: hsl(143, 93%, 47%);
  height: 60px;
  padding-top: 15px;
  color: white;
  font-size: 20px;
  border-radius: 50%;
}

.newChat-header h5 {
  width: max-content;
  font-size: 18px;
  text-align: center;
  margin: 0;
  color: white;
}

#backArrow {
  padding-left: 30px;
  padding-right: 30px;
  /*display: inline-block;*/
  height: 100%;
  width: auto;
}

.parent-height {
  height: inherit;
}

</style>
