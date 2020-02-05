<template lang="html">
  <div class="jobs">
    <h3 v-if="heading" class="heading">{{ heading }}</h3>
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
  props: ['heading', 'jobs'],
  components: { Job }
}
</script>

<style lang="scss" scoped>
  .heading {
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 5px;
    padding: 0 36px;
  }

  .box {
    padding: 25px 36px;

    &:not(:last-child) {
      border-bottom: 1px solid $GREY;
    }
  }
</style>
