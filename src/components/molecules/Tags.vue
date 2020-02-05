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

    > *:not(:last-child) {margin-right: 6px}
  }
</style>
