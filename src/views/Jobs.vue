<template>
  <section class="home">
    <Intro heading="Jobs" :filter="filter">
      <ButtonSecondary @click.native.prevent="filter = !filter">Filter</ButtonSecondary>
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
        :items="$store.getters['groups/getFetched']('groups')"
      />
    </div>
    <template v-if="$store.getters['filters/filtered']">
      <Jobs :jobs="$store.getters['jobs/getFetched']($store.getters['filters/key'])" />
      <Pager
        @load="loadFiltered"
        :loading="$store.state.jobs.loading === $store.getters['filters/key']"
        v-if="$store.getters['jobs/getOffset']($store.getters['filters/key'])"
       />
      <BackTop v-if="!$store.getters['jobs/getOffset']($store.getters['filters/key'])" />
    </template>
    <template v-if="!$store.getters['filters/filtered']">
      <Jobs :jobs="$store.getters['jobs/getFetched']('jobs')" />
      <Pager
        @load="load"
        :loading="$store.state.jobs.loading === 'jobs'"
        v-if="$store.getters['jobs/getOffset']('jobs')"
       />
      <BackTop v-if="!$store.getters['jobs/getOffset']('jobs')" />
    </template>
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
      filter: false,
      closed: false
    }
  },

  created () {
    this.$store.watch(
      (state, getters) => getters['filters/key'],
      (newValue, oldValue) => {
        if (newValue !== oldValue) {
          this.loadFiltered()
        }
      }
    )
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

    await this.$store.dispatch('groups/fetch', { id: 'groups' })

    if (!this.$store.getters['jobs/getFetched']('jobs').length) {
      await this.load()
    }
  },

  methods: {
    async loadFiltered () {
      await this.$store.dispatch('jobs/fetch', {
        id: this.$store.getters['filters/key'],
        params: {
          filterByFormula: this.$store.getters['filters/filter'],
          pageSize,
          sort: [{ field: 'Post Date', direction: 'desc' }],
          offset: this.$store.getters['jobs/getOffset'](this.$store.getters['filters/key'])
        }
      })
    },

    async load () {
      await this.$store.dispatch('jobs/fetch', {
        id: 'jobs',
        params: {
          pageSize,
          sort: [{ field: 'Post Date', direction: 'desc' }],
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
