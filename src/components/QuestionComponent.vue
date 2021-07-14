<template>
  <div class="container col-12">
    <div class="row mx-0 py-2">
      <div class="px-0 d-flex flex-column justify-content-center" style="width: 58px">
        <vote-component @refresh-votes="$emit('refreshVotes')"
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
      bodyState: this.body,
      isOwner: false
    }
  },
  methods: {
    saveAndExit () {
      console.log('save and exit')
      this.edit = !this.edit
    },
    deleteAction () {
      console.log('delete')
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
}

a.save{
  padding-top: 4px;
  text-decoration: none;
  background-color: blue;
  color: white;
  border-radius: 3px;
  cursor: pointer;
}
a.save:hover{
  background-color: darkblue;
}

a.action:hover {
  color: #9fa6ad;
}
</style>
