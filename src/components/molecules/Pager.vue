<template>
  <div class="pager">
    <button class="button" @click.prevent="$emit('load')">
      <template v-if="!loading">See More</template>
      <template v-if="loading">
        <Spinner />
      </template>
    </button>
  </div>
</template>

<script>
import Spinner from '@/components/atoms/Spinner'

export default {
  props: ['loading'],
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
