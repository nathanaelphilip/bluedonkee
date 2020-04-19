<template>
  <section class="home">
    <portal to="banner">
      <Banner
          heading="People-Powered Groups"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur erat eget vulputate pharetra. Praesent vitae enim non risus rhoncus lobortis."
      />
    </portal>
    <portal to="filters">
      <Filters />
    </portal>
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
import Banner from '@/components/molecules/Banner'
import BackTop from '@/components/molecules/BackTop'
import Filters from '@/components/forms/Filters'
import Jobs from '@/components/molecules/Jobs'
import Pager from '@/components/molecules/Pager'

const pageSize = 20

export default {
  name: 'views-jobs',

  metaInfo: {
    title: 'Jobs'
  },

  components: {
    Banner,
    BackTop,
    Filters,
    Jobs,
    Pager
  },

  data () {
    return {
      filter: false,
      closed: false
    }
  },

  computed: {
    avatars () {
      if (this.$store.getters['groups/getFetched']('prefetched').length) {
        return this.$store.getters['groups/getFetched']('prefetched')
      }

      return this.$store.getters['campaigns/getFetched']('prefetched')
    },

    filterCount () {
      return this.$store.getters['filters/count']
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

    await this.$store.dispatch('groups/fetch', { id: 'prefetched' })

    if (!this.$store.getters['jobs/getFetched']('jobs').length) {
      await this.load()
    }

    window.analytics.page('Jobs')
  },

  methods: {
    async loadFiltered () {
      await this.$store.dispatch('jobs/fetch', {
        id: this.$store.getters['filters/key'],
        params: {
          filterByFormula: this.$store.getters['filters/filter'],
          pageSize,
          sort: [{ field: 'Post Date', direction: 'desc' }, { field: 'Group', direction: 'asc' }],
          offset: this.$store.getters['jobs/getOffset'](this.$store.getters['filters/key'])
        }
      })
    },

    async load () {
      await this.$store.dispatch('jobs/fetch', {
        id: 'jobs',
        params: {
          filterByFormula: 'OR({Status} = \'Active\', {Status} = \'Promoted\')',
          pageSize,
          sort: [{ field: 'Post Date', direction: 'desc' }, { field: 'Group', direction: 'asc' }],
          offset: this.$store.getters['jobs/getOffset']('jobs')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .boxed {
    padding: grid(8) grid(8) 0 grid(8);

    @include mq($until: xsmall) {
      padding: grid(6) grid(4) 0 grid(4);
    }
  }
</style>
