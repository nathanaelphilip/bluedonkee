<template>
  <div class="tags">
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .tags {
    @include Flex($justify: flex-start);

    @include mq ($until: xsmall) {
      margin-top: grid(-2);
    }

    > * {
      &:not(:last-child) {
        margin-right: grid(2);
      }

      @include mq ($until: xsmall) {
        margin-top: grid(2);
      }
    }
  }
</style>
