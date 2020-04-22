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
    margin-bottom: 70px;
  }

  .questions {
    padding: 60px 0;
  }

  .question {
    &:not(:last-child) {
      margin-bottom: grid(6);
    }
  }
</style>
