<template>
  <div v-if="!loading">
    <h2>{{ group.fields.Name }}</h2>
    <router-link
      v-for="category in categories"
      :key="`category-${category.id}`"
      :to="{ name: 'groupCategory', params: { slug: category.fields.Slug } }">
      {{ category.fields.Name }}<br>
    </router-link>
    <router-link
      v-for="job in jobs"
      :key="`job-${job.id}`"
      :to="{ name: 'job', params: { slug: job.fields.Slug } }">
      {{ job.fields.Title }}<br>
    </router-link>
    <Jobs :jobs="jobs" />
  </div>
</template>

<script>
import {
  getJobs,
  getGroup,
  getGroupCategories
} from '@/store/helpers'

import Jobs from '@/components/molecules/Jobs'

export default {
  name: 'views-group',
  components: { Jobs },

  data () {
    return {
      loading: true,
      categories: [],
      group: {},
      jobs: []
    }
  },

  async mounted () {
    this.group = await getGroup(this.$route.params.slug)
    this.jobs = this.group.fields.Jobs ? await getJobs(this.group.fields.Jobs) : []
    this.categories = this.group.fields['Groups Categories'] ? await getGroupCategories(this.group.fields['Groups Categories']) : []
    this.loading = false
  }
}
</script>
