<template>
  <section class="home">
    <Intro heading="Jobs">
      <ButtonSecondary>Filter</ButtonSecondary>
      <LinkPrimary :to="{name: 'postJob'}">Post Job</LinkPrimary>
    </Intro>
    <div
      class="boxed"
      v-if="!closed"
      >
      <Banner
        @close="$cookies.set('banner:jobs'); closed = true"
        heading="Positioned for Change."
        content="Find campaigns and organizations fighting to make democracy more equitable. #letsworkblue"
        :link="{name: 'questions'}"
        :items="$store.state.groups.repository"
      />
    </div>
    <Jobs :jobs="$store.getters['jobs/getFetched']('jobs')" />
    <Pager
      @load="load"
      :loading="$store.state.jobs.loading === 'jobs'"
      v-if="$store.getters['jobs/getOffset']('jobs')"
     />
    <BackTop v-if="!$store.getters['jobs/getOffset']('jobs')" />
  </section>
</template>

<script>
import BackTop from '@/components/molecules/BackTop'
import Banner from '@/components/molecules/Banner'
import ButtonSecondary from '@/components/atoms/ButtonSecondary'
import Intro from '@/components/molecules/Intro'
import Jobs from '@/components/molecules/Jobs'
import Pager from '@/components/molecules/Pager'
import LinkPrimary from '@/components/atoms/LinkPrimary'

const pageSize = 20

export default {
  name: 'views-jobs',
  components: {
    BackTop,
    Banner,
    ButtonSecondary,
    Intro,
    Jobs,
    Pager,
    LinkPrimary
  },

  data () {
    return {
      closed: false
    }
  },

  async mounted () {
    if (this.$cookies.isKey('banner:jobs')) {
      this.closed = true
    }

    if (!this.$store.state.workCategories.repository.length) {
      await this.$store.dispatch('workCategories/fetch')
    }

    if (!this.$store.state.workLevels.repository.length) {
      await this.$store.dispatch('workLevels/fetch')
    }

    if (!this.$store.state.workTypes.repository.length) {
      await this.$store.dispatch('workTypes/fetch')
    }

    await this.$store.dispatch('groups/fetch')

    if (!this.$store.getters['jobs/getFetched']('jobs').length) {
      await this.load()
    }
  },

  methods: {
    async load () {
      await this.$store.dispatch('jobs/fetch', {
        id: 'jobs',
        params: {
          pageSize,
          sort: [{ field: 'Created', direction: 'desc' }],
          offset: this.$store.getters['jobs/getOffset']('jobs')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .boxed {
    padding: 32px 36px 0 36px;

    @include mq($until: xsmall) {
      padding: 24px 16px 0 16px;
    }
  }
</style>
