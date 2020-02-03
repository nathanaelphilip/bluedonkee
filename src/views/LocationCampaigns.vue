<template>
  <section v-if="!loading">
    <Intro :heading="`Location: ${location.fields.City}`" />
    <Campaigns :campaigns="campaigns" />
  </section>
</template>

<script>
import {
  getCampaigns,
  getLocation
} from '@/store/helpers'

import Intro from '@/components/molecules/Intro'
import Campaigns from '@/components/molecules/Campaigns'

export default {
  name: 'views-location-campaigns',
  components: { Intro, Campaigns },

  data () {
    return {
      loading: true,
      location: {},
      campaigns: []
    }
  },

  async mounted () {
    this.location = await getLocation(this.$route.params.slug)
    this.campaigns = await getCampaigns(this.location.fields.Campaigns)

    this.loading = false
  }
}
</script>

<style lang="scss" scoped>

</style>
