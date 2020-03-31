<template lang="html">
  <div class="count">
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .count {
    $d: grid(6);
    @include Flex($display: inline-flex, $justify: center);
    background: $BLUE;
    border-radius: 100%;
    color: $WHITE;
    font-size: 12px;
    font-weight: 800;
    margin-left: grid(1.5);
    position: relative;
    top: 0px;
    height: $d;
    width: $d;
  }
</style>
