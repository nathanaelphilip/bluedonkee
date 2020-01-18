<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 14 14"
    style="enable-background:new 0 0 14 14;"
    xml:space="preserve"
    :height="height"
    :width="width"
    :class="`icon-arrow-left ${theme}`"
  >
    <path class="st0" d="M13,6H3.3l4-4.3c0.4-0.4,0.3-1-0.1-1.4c-0.4-0.4-1-0.3-1.4,0.1l-5.5,6c0,0-0.1,0.1-0.1,0.1c0,0.1-0.1,0.1-0.1,0.2C0,6.7,0,6.8,0,6.9C0,6.9,0,7,0,7c0,0,0,0,0,0c0,0.1,0,0.3,0.1,0.4c0.1,0.1,0.1,0.2,0.2,0.3l6,6c0.4,0.4,1,0.4,1.4,0c0.4-0.4,0.4-1,0-1.4L3.4,8H13c0.6,0,1-0.4,1-1S13.6,6,13,6z"/>
  </svg>
</template>

<script>
export default {
  props: ['theme', 'width', 'height']
}
</script>

<style lang="scss" scoped>
  .black {fill: $BLACK}
</style>
