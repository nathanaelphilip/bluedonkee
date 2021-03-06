<template>
  <section class="home" v-if="!loading">
    <portal to="banner">
      <Banner
        :heading="fields.Heading"
        :content="fields.Content"
      />
    </portal>
    <portal to="filters">
      <mq-layout mq="medium+">
        <Filters />
      </mq-layout>
      <mq-layout :mq="['xxsmall', 'xsmall', 'small']">
        <button @click.prevent="mobileFilter = !mobileFilter" class="toggle-filter">
          Filter
          <IconPlus v-if="!$store.getters['filters/count'] && !mobileFilter" :width="10" :height="10" />
          <IconMinus v-if="!$store.getters['filters/count'] && mobileFilter" :width="10" :height="2" />
          <template v-if="$store.getters['filters/count']">
            <Bug>{{ $store.getters['filters/count'] }}</Bug>
          </template>
        </button>
        <FiltersToggle @close="mobileFilter = false" v-if="mobileFilter" />
      </mq-layout>
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
import VueScrollTo from 'vue-scrollto'

import Banner from '@/components/molecules/Banner'
import BackTop from '@/components/molecules/BackTop'
import Bug from '@/components/atoms/Bug'
import Filters from '@/components/forms/Filters'
import FiltersToggle from '@/components/forms/FiltersToggle'
import IconMinus from '@/components/icons/Minus'
import IconPlus from '@/components/icons/Plus'
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
    Bug,
    Filters,
    FiltersToggle,
    IconMinus,
    IconPlus,
    Jobs,
    Pager
  },

  data () {
    return {
      filter: false,
      mobileFilter: false,
      fields: false,
      loading: true
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
    const key = 'Jobs'

    if (!(key in this.$store.state.cms.pages)) {
      await this.$store.dispatch('cms/fetchPage', key)
    }

    this.fields = this.$store.state.cms.pages[key].fields

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

    this.loading = false
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
  },

  watch: {
    mobileFilter (value) {
      if (value === true) {
        VueScrollTo.scrollTo(document.getElementById('sticky-filters'), 500)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .toggle-filter {
    @include Flex ($justify: center);
    background: $WHITE;
    border: none;
    border-bottom: 1px solid $GREY;
    font-weight: 500;
    padding: grid(3) 0;
    text-align: center;
    width: 100%;

    svg {
      margin-left: grid(2);
    }

    .bug {
      margin-left: grid(1);
    }
  }
</style>
