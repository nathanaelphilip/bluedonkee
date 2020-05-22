<template>
  <div class="promoted">
    <h3 class="heading">Promoted Jobs</h3>
    <div
      v-for="job in $store.getters['jobs/getFetched']('promoted')"
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
    if (this.$store.getters['jobs/getFetched']('promoted').length === 0) {
      await this.$store.dispatch('jobs/fetch', {
        id: 'promoted',
        params: { filterByFormula: 'SEARCH("Promoted", Status)', pageSize: 4 }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .promoted {
    background: $BLUELIGHT;
    border-radius: grid(2);
  }

  .heading {
    font-size: 18px;
    font-weight: 900;
    padding: grid(5) grid(4);
  }

  .box {
    border-top: 1px solid $GREY;
    padding: grid(4);
  }
</style>
