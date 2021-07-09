<template>
  <div class="container col-12">
    <div class="row mx-0 py-2">
      <div class="px-0 d-flex flex-column justify-content-center" style="width: 58px">
        <vote-component
          :votes="vote"
        >
        </vote-component>
      </div>
      <div class="col">
        <p> {{ body }} </p>
        <div>
          <div class="d-flex justify-content-end action-time">
            asked {{ questionDate }}
          </div>
          <div>
            <creator-view
              :name="user.name"
              :image-link="'#'"
              :profile-link="'#'">
            </creator-view>
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
    questionDate: {
      String,
      default: ''
    }
  }
}
</script>

<style scoped>
.action-time {
  font-size: 12px;
  collapse: #8b939b;
  opacity: 0.6;
  padding-right: 5.2%;
}
</style>
