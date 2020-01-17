<template>
  <section class="home">
    <div class="jobs">
      <div
        v-for="job in $store.state.jobs.repository"
        :key="job.id"
        class="box">
        <Job :job="job" />
      </div>
    </div>
  </section>
</template>

<script>
import Job from '@/components/molecules/Job'

export default {
  name: 'views-jobs',

  components: { Job },

  async mounted () {
    await this.$store.dispatch('jobs/fetch')
  }
}
</script>

<style lang="scss" scoped>
  .box {
    padding: 25px 36px;

    &:not(:last-child) {
      border-bottom: 1px solid $GREY;
    }
  }
</style>
