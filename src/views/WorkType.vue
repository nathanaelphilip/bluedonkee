<template>
  <section v-if="!loading">
    <Intro :back="{ name: 'jobs' }" :heading="`Type: ${type.fields.Name}`" />
    <Jobs :jobs="jobs" />
  </section>
</template>

<script>
import {
  getJobs,
  getWorkType
} from '@/store/helpers'

import Intro from '@/components/molecules/Intro'
import Jobs from '@/components/molecules/Jobs'

export default {
  name: 'work-type',
  components: { Intro, Jobs },

  data () {
    return {
      loading: true,
      level: {},
      jobs: []
    }
  },

  async mounted () {
    this.type = await getWorkType(this.$route.params.slug)
    this.jobs = await getJobs(this.type.fields.Jobs)

    this.loading = false
  }
}
</script>
