<template>
  <section>
    <header class="header">
      <div class="subheading">Results for</div>
      <h2 class="heading">{{ $store.getters['search/query'] }}</h2>
    </header>
    <Jobs v-if="$route.params.type === 'jobs'" :jobs="$store.getters['jobs/getFetched']('search')" />
    <Pager
      @load="load"
      :loading="$store.state.jobs.loading === 'search'"
      v-if="$store.getters['jobs/getOffset']('search')"
     />
    <BackTop v-if="!$store.getters['jobs/getOffset']($store.getters['search'])" />
  </section>
</template>

<script>
import BackTop from '@/components/molecules/BackTop'
import Jobs from '@/components/molecules/Jobs'
import Pager from '@/components/molecules/Pager'

const pageSize = 20

export default {
  components: { BackTop, Jobs, Pager },

  async mounted () {
    if (!this.$store.getters['jobs/getFetched']('search').length && this.$store.getters['search/query']) {
      await this.load()
    }
  },

  methods: {
    async load () {
      await this.$store.dispatch('jobs/fetch', {
        id: 'search',
        params: {
          filterByFormula: `AND(OR({Status} = 'Active', {Status} = 'Promoted'), SEARCH("${this.$store.getters['search/query']}", {Title}))`,
          pageSize,
          sort: [{ field: 'Post Date', direction: 'desc' }],
          offset: this.$store.getters['jobs/getOffset']('search')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    margin-bottom: grid(18);
    margin-top: grid(16);
  }

  .subheading {
    font-size: 18px;
    font-weight: 800;
    margin-bottom: grid(3);
  }

  .heading {
    font-size: 36px;
    font-weight: 900;
  }
</style>
