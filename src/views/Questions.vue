<template>
  <article class="questions">
    <HeaderPage
      :heading="`Get to know WorkBlue`"
      :content="`You’ve got questions, we’ve got answers.`"
    />
    <Question
      v-for="(question, index) in $store.state.cms.questions"
      :key="index"
      :question="question"
    />
  </article>
</template>

<script>
import HeaderPage from '@/components/molecules/HeaderPage'
import Question from '@/components/molecules/Question'

export default {
  name: 'views-questions',

  metaInfo: {
    title: 'Questions'
  },

  components: { HeaderPage, Question },

  async mounted () {
    await this.$store.dispatch('cms/fetch')

    window.analytics.page('Questions')
  }
}
</script>

<style lang="scss" scoped>
  .header {
    margin-bottom: grid(17);

    @include mq ($until: xsmall) {
      margin-bottom: grid(9);
    }
  }

  .questions {
    padding-bottom: grid(15);
    padding-top: grid(22);

    @include mq ($until: xsmall) {
      padding-bottom: grid(8);
      padding-top: grid(8);
    }
  }

  .question {
    &:not(:last-child) {
      margin-bottom: grid(6);
    }
  }
</style>
