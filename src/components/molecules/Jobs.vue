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
    font-size: 22px;
    font-weight: 900;
    margin-bottom: grid(10);

    @include mq ($until: small) {
      margin-bottom: grid(6);
      padding: 0 grid(6);
    }
  }

  .box {
    @include mq ($until: small) {
      border-bottom: 1px solid $GREY;
    }

    &:not(:last-child) {
      margin-bottom: grid(8);

      @include mq ($until: small) {
        margin-bottom: grid(0);
      }
    }
  }

  .empty {
    margin-bottom: grid(12);
    margin-top: grid(-4);
  }
</style>
