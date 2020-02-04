<template>
  <div class="promoted">
    <h3 class="heading">Promoted Jobs</h3>
    <div
      v-for="job in $store.state.jobs.repository.slice(0, 4)"
      :key="job.id"
      class="box"
      >
      <JobPromoted :job="job" />
    </div>
  </div>
</template>

<script>
import JobPromoted from '@/components/molecules/JobPromoted'

export default {
  components: { JobPromoted },

  async mounted () {
    if (this.$store.state.jobs.repository.length === 0) {
      await this.$store.dispatch('jobs/fetch')
    }
  }
}
</script>

<style lang="scss" scoped>
  .promoted {
    background: $BLUELIGHT;
  }

  .heading {
    font-size: 18px;
    font-weight: 900;
    padding: 20px 16px;
  }

  .box {
    padding: 20px 15px;

    &:not(:last-child) {
      border-bottom: 1px solid $GREY;
    }
  }
</style>
