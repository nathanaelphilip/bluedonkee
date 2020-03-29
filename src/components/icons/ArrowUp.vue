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
    :class="`icon-arrow-up ${theme}`"
  >
    <path d="M13.7,5.8l-6-5.5c0,0-0.1-0.1-0.1-0.1c-0.1,0-0.1-0.1-0.2-0.1C7.3,0,7.2,0,7.1,0C7.1,0,7,0,7,0c0,0,0,0,0,0C6.9,0,6.7,0,6.6,0.1C6.5,0.1,6.4,0.2,6.3,0.3l-6,6c-0.4,0.4-0.4,1,0,1.4c0.4,0.4,1,0.4,1.4,0L6,3.4V13c0,0.6,0.4,1,1,1s1-0.4,1-1V3.3l4.3,4c0.4,0.4,1,0.3,1.4-0.1C14.1,6.8,14.1,6.1,13.7,5.8z"/>
  </svg>
</template>

<script>
export default {
  props: ['theme', 'width', 'height']
}
</script>

<style lang="scss" scoped>
  .icon-arrow-up { fill: $BLACK; }
</style>
