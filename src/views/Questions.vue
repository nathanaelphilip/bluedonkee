<template>
  <article class="questions">
    <HeaderPage
      :heading="`Frequently Asked Questions`"
      :content="`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis malesuada bibendum ligula, eu consequat velit placerat id.`"
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
    padding-bottom: grid(18);
    padding-top: grid(22);

    @include mq ($until: xsmall) {
      padding-top: grid(8);
    }
  }

  .question {
    &:not(:last-child) {
      margin-bottom: grid(6);
    }
  }
</style>
