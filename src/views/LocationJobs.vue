<template>
  <section v-if="!loading">
    <Intro :heading="`Location: ${location.fields.City}`" />
    <Jobs :jobs="jobs" />
  </section>
</template>

<script>
import {
  getByIds,
  getBySlug
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
    this.location = await getBySlug({
      slug: this.$route.params.slug,
      type: 'locations'
    })

    this.jobs = await getByIds({
      ids: this.location.fields.Jobs,
      type: 'jobs'
    })

    this.loading = false
  }
}
</script>

<style lang="scss" scoped>

</style>
