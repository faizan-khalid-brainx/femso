<template>
  <div class="container col-12" style="border-bottom: #eff0f1 1px solid">
    <div class="row mx-0 py-2">
      <div class="px-0 d-flex flex-column justify-content-center" style="width: 58px">
        <stats :count="voteCount" :item="'votes'">
        </stats>
        <stats :count="answerCount" :item="'answers'">
        </stats>
      </div>
      <div class="col">
        <h3>
          <a :href="questionLink"> {{ questionTitle }}</a>
        </h3>
        <div class="excerpt">
          {{ questionContent }}
        </div>
        <div>
          <div class="d-flex justify-content-end action-time">asked {{ questionDate }}</div>
          <div>
            <creator-view
              :name="name"
              :image-link="imageLink"
              :profile-link="profileLink">
            </creator-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Stats from '@/components/Stats'
import CreatorView from '@/components/CreatorView'

export default {
  name: 'QuestionView',
  components: {
    CreatorView,
    Stats
  },
  props: {
    questionTitle: String,
    questionLink: String,
    questionContent: String,
    voteCount: Number,
    answerCount: Number,
    questionDate: String,
    name: String, // content for the profile component
    profileLink: String,
    imageLink: String
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

.excerpt {
  height: 3rem;
  overflow: hidden;
}

h3 {
  font-size: 1.30769231rem
}

a:link, a:visited, a:hover, a:active {
  text-decoration: none;
}

</style>
