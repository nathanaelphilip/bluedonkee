<template>
  <section v-if="!loading">
    <Intro :heading="location.fields.City" />
    <Campaigns :campaigns="$store.getters['campaigns/getFetched'](id)" />
    <Pager
      @load="load"
      :loading="$store.state.campaigns.loading === id"
      v-if="$store.getters['campaigns/getOffset'](id)"
     />
    <BackTop v-if="!$store.getters['campaigns/getOffset'](id)" />
  </section>
</template>

<script>
import {
  getBySlug
} from '@/store/helpers'

import BackTop from '@/components/molecules/BackTop'
import Campaigns from '@/components/molecules/Campaigns'
import Intro from '@/components/molecules/Intro'
import Pager from '@/components/molecules/Pager'

const pageSize = 20

export default {
  name: 'views-location-campaigns',

  metaInfo () {
    return {
      title: this.location && this.location.fields ? `Location Campaigns: ${this.location.fields.City}` : 'Location Campaigns'
    }
  },

  components: { BackTop, Campaigns, Intro, Pager },

  data () {
    return {
      id: false,
      loading: true,
      location: {}
    }
  },

  async mounted () {
    this.id = `campaigns/location/${this.$route.params.slug}`

    this.location = await getBySlug({
      slug: this.$route.params.slug,
      type: 'locations'
    })

    this.$store.dispatch('app/setHeading', `Location: ${this.location.fields.City}`)

    if (!this.$store.getters['campaigns/getFetched'](this.id).length) {
      await this.load()
    }

    this.loading = false

    window.analytics.page('Location Campaigns')
  },

  methods: {
    async load () {
      const state = this.$store.getters['states/getById'](this.location.fields.State[0])

      await this.$store.dispatch('campaigns/fetch', {
        id: this.id,
        params: {
          filterByFormula: `SEARCH("${this.location.fields.City}, ${state.fields.Name}", {Location})`,
          pageSize,
          sort: [{ field: 'Name', direction: 'asc' }],
          offset: this.$store.getters['campaigns/getOffset'](this.id)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
