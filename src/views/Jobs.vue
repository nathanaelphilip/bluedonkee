<template>
  <section class="home">
    <Jobs :jobs="$store.state.jobs.repository" />
  </section>
</template>

<script>
import Jobs from '@/components/molecules/Jobs'

export default {
  name: 'views-jobs',

  components: { Jobs },

  async mounted () {
    await this.$store.dispatch('jobs/fetch')
  }
}
</script>

<style lang="scss" scoped>
</style>
