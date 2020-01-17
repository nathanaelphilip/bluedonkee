<template>
  <article v-if="!loading">
    <h2>{{ type.fields.Name }}</h2>
    <div>
      <router-link
        v-for="job in jobs"
        :key="`job-${job.id}`"
        :to="{name: 'job', params: { slug: job.fields.Slug }}"
       >
         {{ job.fields.Title }}<br>
      </router-link>
    </div>

    <Jobs :jobs="jobs" />
  </article>
</template>

<script>
import {
  getJobs,
  getWorkType
} from '@/store/helpers'

import Jobs from '@/components/molecules/Jobs'

export default {
  name: 'work-type',
  components: { Jobs },

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
