<template>
  <div class="pager">
    <button class="button" @click.prevent="$emit('load')">
      <template v-if="!$store.state.jobs.loading">See More</template>
      <template v-if="$store.state.jobs.loading === 'jobs'">
        <Spinner />
      </template>
    </button>
  </div>
</template>

<script>
import Spinner from '@/components/atoms/Spinner'

export default {
  components: { Spinner }
}
</script>

<style lang="scss" scoped>
  .pager {
    @include Flex($justify: center);
    padding: grid(15) 0;

    @include mq ($until: xsmall) {
      padding-bottom: calc(grid(15) + 84px);
    }
  }

  .button {
    @include ButtonSecondary;
  }
</style>
