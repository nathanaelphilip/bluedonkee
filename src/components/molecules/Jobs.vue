<template lang="html">
  <div class="jobs" :class="{simple}">
    <h3 v-if="heading" class="heading">{{ heading }}</h3>
    <div
      v-for="job in jobs"
      :key="job.id"
      class="box">
      <Job :job="job" :simple="simple" />
    </div>
    <div class="empty" v-if="!jobs.length">
      <slot name="empty"></slot>
    </div>
  </div>
</template>

<script>
import Job from '@/components/molecules/Job'

export default {
  props: ['heading', 'jobs', 'simple'],
  components: { Job }
}
</script>

<style lang="scss" scoped>
  .heading {
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 30px;
    padding: 0 32px;

    @include mq ($until: xsmall) {
      padding: 0px 16px;
    }
  }

  .box {
    padding: grid(6) grid(8);

    @include mq($until: xsmall) {
      padding: grid(6) grid(4);
    }

    .simple &:nth-child(2) { padding-top: 0; }

    &:not(:last-child) {
      border-bottom: 1px solid $GREY;
    }
  }

  .empty {
    margin-bottom: 48px;
    margin-top: -15px;
    padding: 0 32px;

    @include mq ($until: xsmall) {
      padding: 0px 16px;
    }
  }
</style>
