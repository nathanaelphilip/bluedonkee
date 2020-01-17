<template>
  <div class="home">
    <ul>
      <li :key="job.id" v-for="job in $store.state.jobs.repository">
        <router-link :to="`/job/${job.fields.Slug}`">{{ job.fields.Title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'jobs',

  async mounted () {
    await this.$store.dispatch('jobs/fetch')
  }
}
</script>
