<template>
  <section v-if="!loading">
    <Intro :heading="`Location: ${location.fields.City}`" />
    <Jobs :jobs="jobs" />
  </section>
</template>

<script>
import {
  getJobs,
  getLocation
} from '@/store/helpers'

import Intro from '@/components/molecules/Intro'
import Jobs from '@/components/molecules/Jobs'

export default {
  name: 'views-location-jobs',
  components: { Intro, Jobs },

  data () {
    return {
      loading: true,
      location: {},
      jobs: []
    }
  },

  async mounted () {
    this.location = await getLocation(this.$route.params.slug)
    this.jobs = await getJobs(this.location.fields.Jobs)

    this.loading = false
  }
}
</script>

<style lang="scss" scoped>

</style>
