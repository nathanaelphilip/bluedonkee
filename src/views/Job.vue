<template>
  <div v-if="job.fields">
    {{ job.fields.Title }}
  </div>
</template>

<script>
import { getJobs } from '@/api'

export default {
  name: 'job',

  data () {
    return {
      job: {}
    }
  },

  async mounted () {
    console.log(this.$route.params.slug)

    const { data } = await getJobs({
      params: {
        filterByFormula: `SEARCH("${this.$route.params.slug}", Slug)`
      }
    })

    this.job = data.records[0]
  }
}
</script>
