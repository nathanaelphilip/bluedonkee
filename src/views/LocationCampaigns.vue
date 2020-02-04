<template>
  <section v-if="!loading">
    <Intro :heading="`Location: ${location.fields.City}`" />
    <Campaigns :campaigns="campaigns" />
  </section>
</template>

<script>
import {
  getByIds,
  getBySlug
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
    this.location = await getBySlug({
      slug: this.$route.params.slug,
      type: 'locations'
    })

    this.campaigns = await getByIds({
      ids: this.location.fields.Campaigns,
      type: 'campaigns'
    })

    this.loading = false
  }
}
</script>

<style lang="scss" scoped>

</style>
