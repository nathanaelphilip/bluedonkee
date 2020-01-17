<template>
  <article v-if="!loading">
    <h2>{{ level.fields.Name }}</h2>
    <div>
      <router-link
        v-for="job in jobs"
        :key="`job-${job.id}`"
        :to="{name: 'job', params: { slug: job.fields.Slug }}"
       >
         {{ job.fields.Title }}<br>
      </router-link>
    </div>
  </article>
</template>

<script>
import {
  getJobs,
  getWorkLevel
} from '@/store/helpers'

export default {
  name: 'work-level',

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
