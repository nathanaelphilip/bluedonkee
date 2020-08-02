<template>
  <section>
    <header class="header">
      <div class="subheading">Results for</div>
      <h2 class="heading">{{ $store.getters['search/query'] }}</h2>
    </header>
    <nav class="navigation">
      <router-link class="anchor" to="/search/jobs">Jobs</router-link>
      <router-link class="anchor" to="/search/groups">Groups</router-link>
      <router-link class="anchor" to="/search/campaigns">Campaigns</router-link>
    </nav>
    <Jobs v-if="$route.params.type === 'jobs'" :jobs="$store.getters['jobs/getFetched']('search')" />
    <Campaigns v-if="$route.params.type === 'campaigns'" :campaigns="$store.getters['campaigns/getFetched']('search')" />
    <Groups v-if="$route.params.type === 'groups'" :groups="$store.getters['groups/getFetched']('search')" />
    <Pager
      @load="load"
      :loading="$store.state.jobs.loading === 'search'"
      v-if="$route.params.type === 'jobs' && $store.getters['jobs/getOffset']('search')"
     />
    <Pager
      @load="load"
      :loading="$store.state.campaigns.loading === 'search'"
      v-if="$route.params.type === 'campaigns' && $store.getters['campaigns/getOffset']('search')"
     />
     <Pager
      @load="load"
      :loading="$store.state.groups.loading === 'search'"
      v-if="$route.params.type === 'groups' && $store.getters['groups/getOffset']('search')"
     />
    <BackTop v-if="!$store.getters['jobs/getOffset']($store.getters['search'])" />
  </section>
</template>

<script>
import BackTop from '@/components/molecules/BackTop'
import Campaigns from '@/components/molecules/Campaigns'
import Groups from '@/components/molecules/Groups'
import Jobs from '@/components/molecules/Jobs'
import Pager from '@/components/molecules/Pager'

const pageSize = 20

export default {
  components: { BackTop, Campaigns, Groups, Jobs, Pager },

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
    @include mq ($from: small) {
      margin-bottom: grid(8);
      margin-top: grid(16);
    }

    @include mq ($until: small) {
      @include Flex ($justify: flex-start);
      background: $WHITE;
      border-bottom: 1px solid $GREY;
      font-size: 15px;
      padding: grid(4) grid(5);
      position: sticky;
      top: 69px;
      z-index: 2;
    }
  }

  .subheading {
    @include mq ($from: small) {
      font-size: 18px;
      font-weight: 800;
      margin-bottom: grid(3);
    }

    @include mq ($until: small) {
      margin-right: grid(1);
    }
  }

  .heading {
    font-weight: 900;

    @include mq ($from: small) {
      font-size: 36px;
      margin-bottom: grid(6);
    }
  }

  .navigation {
    @include mq ($from: small) {
      margin-bottom: grid(12);
    }

    @include mq ($until: small) {
      padding: grid(4) grid(5) 0 grid(5);
    }
  }

  .anchor {
    @include ButtonSimple;

    &:not(:last-child) {
      margin-right: grid(2);
    }
  }
</style>
