<template>
  <div>
    <a :id="'vote-up'+id" href="/" @click.prevent="upVote()" :class="getClass(upVoted)">Up</a>
    <strong>
      {{ votes }}
    </strong>
    <a :id="'vote-down'+id" href="/" @click.prevent="downVote()" :class="getClass(downVoted)">Down</a>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    votes: Number,
    loginId: Number,
    id: {
      Number,
      required: true
    },
    isQuestion: Boolean,
    voteButton: Number
  },
  data () {
    return {
      upVoted: false,
      downVoted: false
    }
  },
  mounted () {
    if (this.voteButton === 1) {
      this.$data.upVoted = true
    }
    if (this.voteButton === 0) {
      this.$data.downVoted = true
    }
  },
  methods: {
    getClass (status) {
      if (status) {
        return 'd-block disabled'
      } else {
        return 'd-block'
      }
    },
    upVote () {
      console.log(this.loginId)
      if (this.loginId) {
        if (this.downVoted) {
          this.downVoted = false
          this.upVoted = true
          // REMOVE DOWNVOTE AND CALL UPVOTE
          this.update_downvote(0)
          this.update_upvote(1)
        } else {
          this.upVoted = !this.upVoted
          // ADD UPVOTE OR REMOVE UPVOTE
          this.update_upvote(this.upVoted)
        }
      } else {
        this.$router.push('/login')
      }
    },
    downVote () {
      console.log(this.loginId)
      if (this.loginId) {
        if (this.upVoted) {
          this.upVoted = false
          this.downVoted = true
          // REMOVE UPVOTE AND CALL DOWNVOTE
          this.update_upvote(0)
          this.update_downvote(1)
        } else {
          this.downVoted = !this.downVoted
          // ADD DOWNVOTE OR REMOVE UPVOTE
          this.update_downvote(this.downVoted)
        }
      } else {
        this.$router.push('/login')
      }
    },
    async update_upvote (update) {
      let callee = 'answer'
      if (this.isQuestion) {
        callee = 'question'
      }
      const payload = {
        id: this.id,
        vote: 1,
        update: update // 1 for create & 0 for delete
      }
      // call api here
      try {
        await (axios.post(`http://127.0.0.1:8000/api/${callee}-vote`, payload, {
          headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('api_token')
          }
        }))
        this.$emit('refreshData')
      } catch (error) {
        console.error(error.response.data.message)
      }
    },
    async update_downvote (update) {
      let callee = 'answer'
      if (this.isQuestion) {
        callee = 'question'
      }
      const payload = {
        id: this.id,
        vote: 0,
        update: update // 1 for create & 0 for delete
      }
      // call api here
      try {
        await (axios.post(`http://127.0.0.1:8000/api/${callee}-vote`, payload, {
          headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('api_token')
          }
        }))
        this.$emit('refreshData')
      } catch (error) {
        console.error(error.response.data.message)
      }
    }
  }
}
</script>

<style scoped>

* {
  text-align: center;
}

strong {
  font-size: 1.30769231rem;;
}

a.disabled, a:link.disabled, a:visited.disabled, a:hover.disabled, a:active.disabled {
  text-decoration: none;
  color: #dd7521;
}

a, a:link, a:visited, a:hover, a:active {
  text-decoration: none;
  color: #bbc0c4;
}

</style>
