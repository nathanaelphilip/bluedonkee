<template>
  <section class="home">
    <Intro @close="filter = false" heading="Jobs" :filter="filter">
      <ButtonSecondary :class="{'bugged': filterCount}" @click.native.prevent="filter = !filter">
        Filter
        <Count v-if="filterCount">{{ filterCount }}</Count>
      </ButtonSecondary>
      <LinkPrimary classes="small" :to="{name: 'postJob'}">Post Job</LinkPrimary>
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
        :items="avatars"
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
import Count from '@/components/atoms/Count'
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
    Count,
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
