<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 25 21"
    style="enable-background:new 0 0 25 21;"
    xml:space="preserve"
    :height="height"
    :width="width"
    :class="`icon-twitter ${theme}`"
  >
    <path d="M24.3,0.4c-1,0.6-2.1,1-3.2,1.3C20.1,0.6,18.7,0,17.3,0c-2.8,0-5.1,2.4-5.1,5.2c0,0.4,0,0.8,0.1,1.2C7.9,6.3,4.2,4.2,1.7,0.9C1.2,1.8,0.9,2.6,0.9,3.7c0,1.9,0.9,3.5,2.3,4.4C2.4,8,1.6,7.8,0.9,7.3v0.1c0,2.5,1.8,4.7,4.2,5.2c-0.4,0.1-0.8,0.2-1.4,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2.1,2.5,3.7,4.8,3.7c-1.8,1.5-4,2.3-6.4,2.3c-0.4,0-0.8,0-1.3-0.1C2.2,20.2,4.9,21,7.7,21c9.5,0,14.6-8.1,14.6-15.1c0-0.2,0-0.4,0-0.7c1-0.7,1.9-1.7,2.6-2.7c-0.9,0.4-1.9,0.7-2.9,0.8C23.1,2.6,24,1.6,24.3,0.4z"/>
  </svg>
</template>

<script>
export default {
  props: ['theme', 'width', 'height']
}
</script>

<style lang="scss" scoped>
  .icon-twitter {}
  .blue {fill: $BLUE}
</style>
