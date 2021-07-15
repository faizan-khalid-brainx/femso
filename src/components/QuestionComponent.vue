<template>
  <div class="container col-12">
    <div class="row mx-0 py-2">
      <div class="px-0 d-flex flex-column justify-content-center" style="width: 58px">
        <vote-component @refresh-data="$emit('refreshData')"
                        :votes="vote"
                        :id="id"
                        :vote-button="voteButton"
                        :is-question="isQuestion"
        >
        </vote-component>
      </div>
      <div class="col">
        <p v-if="edit"> {{ bodyState }} </p>
        <textarea v-else v-model="bodyState" class="editable w-100"></textarea>
        <div class="row">
          <div v-if="isOwner" class="col">
            <a class="action px-1" @click.prevent="editAction" title="Opens Editor">Edit</a>
            <a class="action px-1" @click.prevent="deleteAction" title="Deletes the post">Delete</a>
            <a class="save px-1" v-if="!edit" @click="saveAndExit" title="Saves your edits">Save</a>
          </div>
          <div class="col">
            <div class="d-flex justify-content-end action-time">
              asked {{ questionDate }}
            </div>
            <div>
              <creator-view
                :name="user.name"
                :profile-link="'#'">
              </creator-view>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VoteComponent from '@/components/VoteComponent'
import CreatorView from '@/components/CreatorView'
import axios from 'axios'

export default {
  name: 'QuestionComponent',
  components: {
    CreatorView,
    VoteComponent
  },
  props: {
    body: {
      String,
      default: ''
    },
    user: {
      Object,
      default () {
        return { name: '' }
      }
    },
    loginId: Number,
    vote: {
      Number,
      default: 0
    },
    isQuestion: Boolean,
    voteButton: Number,
    questionDate: {
      String,
      default: ''
    },
    id: {
      Number,
      required: true
    }
  },
  data () {
    return {
      voteState: this.vote,
      edit: true,
      bodyState: this.body
    }
  },
  computed: {
    isOwner () {
      return (this.loginId === this.user.id)
    }
  },
  methods: {
    saveAndExit () {
      console.log('save and exit')
      this.editApi()
      this.edit = !this.edit
    },
    deleteAction () {
      console.log('delete pressed')
      this.deleteApi()
    },
    editApi () {
      let callee = 'answer'
      if (this.isQuestion) {
        callee = 'question'
      }
      const payload = {
        id: this.id,
        content: this.bodyState
      }
      try {
        axios.post(`http://127.0.0.1:8000/api/${callee}/edit?_method=PUT`, payload, {
          headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('api_token')
          }
        })
        // this.$emit('refreshData')
      } catch (error) {
        if (error.response.status === 500) {
          console.error('Please login again')
        }
        console.error(error.response.data.message)
      }
    },
    async deleteApi () {
      let callee = 'answer'
      if (this.isQuestion) {
        callee = 'question'
      }
      const payload = {
        id: this.id
      }
      try {
        await (axios.post(`http://127.0.0.1:8000/api/${callee}/delete?_method=DELETE`, payload, {
          headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('api_token')
          }
        }))
        if (this.isQuestion) {
          await this.$router.replace('/')
        }
      } catch (error) {
        if (error.response.status === 500) {
          console.error('Please login again')
        }
        console.error(error.response.data.message)
      }
    },
    editAction () {
      this.edit = !this.edit
      this.bodyState = this.body
    }
  }
}
</script>

<style scoped>
.action-time {
  font-size: 12px;
  collapse: #8b939b;
  opacity: 0.6;
}

textarea.editable {
  resize: none;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

a.action {
  color: #6a737c;
  text-decoration: none;
  cursor: pointer;
  font-size: 12px;
}

a.save {
  padding-top: 4px;
  text-decoration: none;
  background-color: blue;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}

a.save:hover {
  background-color: darkblue;
}

a.action:hover {
  color: #9fa6ad;
}
</style>
