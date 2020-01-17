<template lang="html">
  <div class="jobs">
    <div
      v-for="job in jobs"
      :key="job.id"
      class="box">
      <Job :job="job" />
    </div>
  </div>
</template>

<script>
import Job from '@/components/molecules/Job'

export default {
  props: ['jobs'],
  components: { Job }
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
