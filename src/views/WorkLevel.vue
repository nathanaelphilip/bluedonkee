<template>
  <section v-if="!loading">
    <Intro :back="{ name: 'jobs' }" :heading="`Level: ${level.fields.Name}`" />
    <Jobs :jobs="jobs" />
  </section>
</template>

<script>
import {
  getJobs,
  getWorkLevel
} from '@/store/helpers'

import Intro from '@/components/molecules/Intro'
import Jobs from '@/components/molecules/Jobs'

export default {
  name: 'work-level',
  components: { Intro, Jobs },

  data () {
    return {
      loading: true,
      level: {},
      jobs: []
    }
  },

  async mounted () {
    this.level = await getWorkLevel(this.$route.params.slug)
    this.jobs = await getJobs(this.level.fields.Jobs)

    this.loading = false
  }
}
</script>
