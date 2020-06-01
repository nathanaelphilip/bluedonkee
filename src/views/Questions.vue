<template>
  <article class="questions" v-if="!loading">
    <HeaderPage
      :heading="fields.Heading"
      :content="fields.Subheading"
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

  data () {
    return {
      fields: false,
      loading: true
    }
  },

  async mounted () {
    const key = 'Questions'

    if (!(key in this.$store.state.cms.pages)) {
      await this.$store.dispatch('cms/fetchPage', key)
    }

    this.fields = this.$store.state.cms.pages[key].fields

    await this.$store.dispatch('cms/fetchQuestions')

    window.analytics.page('Questions')

    this.loading = false
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
