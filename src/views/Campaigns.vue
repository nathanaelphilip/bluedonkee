<template>
  <section v-if="!loading">
    <portal to="banner">
      <Banner
        :heading="fields.Heading"
        :content="fields.Content"
      />
    </portal>
    <Campaigns :campaigns="$store.getters['campaigns/getFetched']('campaigns')" />
    <Pager
      @load="load"
      :loading="$store.state.campaigns.loading === 'campaigns'"
      v-if="$store.getters['campaigns/getOffset']('campaigns')"
    />
    <BackTop v-if="!$store.getters['campaigns/getOffset']('campaigns')" />
  </section>
</template>

<script>
import BackTop from '@/components/molecules/BackTop'
import Banner from '@/components/molecules/Banner'
import Campaigns from '@/components/molecules/Campaigns'
import Pager from '@/components/molecules/Pager'

const pageSize = 20

export default {
  name: 'views-campaigns',

  metaInfo: {
    title: 'Campaigns'
  },

  components: {
    BackTop,
    Banner,
    Campaigns,
    Pager
  },

  data () {
    return {
      fields: false,
      loading: true
    }
  },

  async mounted () {
    const key = 'Campaigns'

    if (!(key in this.$store.state.cms.pages)) {
      await this.$store.dispatch('cms/fetchPage', key)
    }

    this.fields = this.$store.state.cms.pages[key].fields

    if (!this.$store.state.offices.repository.length) {
      await this.$store.dispatch('offices/fetch')
    }

    if (!this.$store.getters['campaigns/getFetched']('campaigns').length) {
      await this.load()
    }

    window.analytics.page('Campaigns')

    this.loading = false
  },

  methods: {
    async load () {
      await this.$store.dispatch('campaigns/fetch', {
        id: 'campaigns',
        params: {
          pageSize,
          sort: [{ field: 'Name', direction: 'asc' }],
          offset: this.$store.getters['campaigns/getOffset']('campaigns')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .boxed {
    padding: grid(8) grid(8) 0 grid(8);

    @include mq($until: small) {
      padding: grid(8) grid(4) 0 grid(4);
    }
  }
</style>
