<template>
  <div class="home">
    <ul>
      <li :key="job.id" v-for="job in jobs">
        <router-link :to="`/job/${job.fields.Slug}`">{{ job.fields.Title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import { getJobs } from '@/api'

export default {
  name: 'jobs',

  data () {
    return {
      jobs: []
    }
  },

  async mounted () {
    const { data } = await getJobs({
      params: {
        filterByFormula: 'SEARCH("Active", Status)'
      }
    })
    this.jobs = data.records
  }
}
</script>
