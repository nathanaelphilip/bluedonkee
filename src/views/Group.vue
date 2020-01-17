<template>
  <div v-if="!loading">
    <h2>{{ group.fields.Name }}</h2>
    <router-link
      v-for="job in jobs"
      :key="`job-${job.id}`"
      :to="{ name: 'job', params: { slug: job.fields.Slug } }">
      {{ job.fields.Title }}<br>
    </router-link>
  </div>
</template>

<script>
import {
  getJobs,
  getGroup
} from '@/store/helpers'

export default {
  name: 'group',

  data () {
    return {
      loading: true,
      group: {},
      jobs: []
    }
  },

  async mounted () {
    this.group = await getGroup(this.$route.params.slug)
    this.jobs = this.group.fields.Jobs ? await getJobs(this.group.fields.Jobs) : []
    this.loading = false
  }
}
</script>
