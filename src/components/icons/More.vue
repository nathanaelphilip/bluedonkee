<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 28 6"
    style="enable-background:new 0 0 28 6;"
    xml:space="preserve"
    :height="height"
    :width="width"
    :class="`icon-more`"
  >
    <circle class="st0" cx="3.5" cy="3" r="3" />
    <circle class="st0" cx="14" cy="3" r="3" />
    <circle class="st0" cx="24.5" cy="3" r="3" />
  </svg>
</template>

<script>
export default {
  props: ['width', 'height']
}
</script>

<style lang="scss" scoped>
  .icon-sidebar {}
  .st0 {fill: $BLUEGREY;}
</style>
