<template>
  <article v-if="!loading">
    <h2>{{ category.fields.Name }}</h2>
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
  getGroupCategory
} from '@/store/helpers'

export default {
  name: 'group-category',

  data () {
    return {
      loading: true,
      category: {},
      jobs: []
    }
  },

  async mounted () {
    this.category = await getGroupCategory(this.$route.params.slug)
    this.jobs = await getJobs(this.category.fields.Jobs)

    this.loading = false
  }
}
</script>
