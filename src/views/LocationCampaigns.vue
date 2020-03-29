<template>
  <section v-if="!loading">
    <Intro :back="{ name: 'campaigns' }" :heading="`Location: ${location.fields.City}`" />
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
import Intro from '@/components/molecules/Intro'
import Campaigns from '@/components/molecules/Campaigns'
import Pager from '@/components/molecules/Pager'

const pageSize = 20

export default {
  name: 'views-location-campaigns',
  components: { BackTop, Intro, Campaigns, Pager },

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

    if (!this.$store.getters['campaigns/getFetched'](this.id).length) {
      await this.load()
    }

    this.loading = false
  },

  methods: {
    async load () {
      await this.$store.dispatch('campaigns/fetch', {
        id: this.id,
        params: {
          filterByFormula: `SEARCH("${this.location.fields.City}", {Location})`,
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
