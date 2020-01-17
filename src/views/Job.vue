<template>
  <article v-if="!loading">
    <div>
      <a :href="`${groups[0].fields.Website}`" target="_blank">Website</a>
      <a :href="`https://twitter.com/${groups[0].fields.Twitter}`" target="_blank">{{ groups[0].fields.Twitter }}</a>
    </div>

    {{ job.fields.Title }}

    <div>
      {{ groups[0].fields.Name }}
    </div>
    <div>
      Tags
    </div>
    <div>
      <h3>Job Overview</h3>
      {{ job.fields.Description }}
    </div>
    <div>
      Something off with this post?
      <button>Flag Posting</button>
    </div>
  </article>
</template>

<script>
import { getJob, getJobGroups } from '@/store/helpers'

export default {
  name: 'job',

  data () {
    return {
      loading: true,
      job: {},
      groups: [],
      workTypes: [],
      workLevels: [],
      workCategories: []
    }
  },

  async mounted () {
    this.job = await getJob(this.$route.params.slug)
    this.groups = await getJobGroups(this.job.fields.Group)
    this.loading = false
  }
}
</script>
