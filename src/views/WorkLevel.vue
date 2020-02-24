<template>
  <section v-if="!loading">
    <Intro :back="{ name: 'jobs' }" :heading="`Level: ${level.fields.Name}`" />
    <Jobs :jobs="jobs.sort((a, b) => {
      return a.fields.Created < b.fields.Created ? 1 : -1
    })" />
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
    this.level = await getBySlug({
      slug: this.$route.params.slug,
      type: 'workLevels'
    })

    this.jobs = await getByIds({
      ids: this.level.fields.Jobs,
      type: 'jobs'
    })

    this.loading = false
  }
}
</script>
