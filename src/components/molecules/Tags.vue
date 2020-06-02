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
    margin-top: grid(-2);

    > * {
      margin-top: grid(2);

      &:not(:last-child) {
        margin-right: grid(2);
      }
    }
  }
</style>
