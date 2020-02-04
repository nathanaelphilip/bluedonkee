<template>
  <section v-if="!loading">
    <Intro :back="{ name: 'jobs' }" :heading="`Type: ${type.fields.Name}`" />
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
    this.type = await getBySlug({
      slug: this.$route.params.slug,
      type: 'workTypes'
    })

    this.jobs = await getByIds({
      ids: this.type.fields.Jobs,
      type: 'jobs'
    })

    this.loading = false
  }
}
</script>
