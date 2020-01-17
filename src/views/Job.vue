<template>
  <article v-if="job.fields && groups && groups.length > 0 && groups.length">
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
export default {
  name: 'job',

  data () {
    return {
      job: {},
      groups: [],
      workTypes: [],
      workLevels: [],
      workCategories: []
    }
  },

  async mounted () {
    const slug = this.$route.params.slug

    let job = this.$store.getters['jobs/getBySlug'](slug)

    if (!job) {
      job = await this.$store.dispatch('jobs/get', {
        params: {
          filterByFormula: `SEARCH("${slug}", Slug)`
        }
      })
    }

    this.job = job

    const groups = this.job.fields.Group.map(async (group) => {
      const stored = this.$store.getters['groups/getById'](group)

      if (!stored) {
        const data = await this.$store.dispatch('groups/getById', group)
        return data
      }

      return stored
    })

    this.groups = await Promise.all(groups)
  }
}
</script>
