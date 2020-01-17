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
    display: flex;

    > *:not(:last-child) {margin-right: 6px}
  }
</style>
