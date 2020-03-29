<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 19 20"
    style="enable-background:new 0 0 19 20;"
    xml:space="preserve"
    :height="height"
    :width="width"
    :class="`icon-share`"
  >
    <path d="M11.7,15.5l-5.4-2.9c-1.4,1.4-3.8,1.4-5.2,0s-1.4-3.8,0-5.2s3.8-1.4,5.2,0l5.4-2.9c-0.4-1.8,0.6-3.6,2.3-4.2c1.7-0.6,3.6,0.1,4.5,1.7s0.4,3.6-1,4.7s-3.5,1-4.8-0.3L7.3,9.2c0.1,0.5,0.1,1,0,1.5l5.4,2.9c1.3-1.3,3.4-1.4,4.8-0.3c1.5,1.1,1.9,3.1,1,4.7c-0.9,1.6-2.8,2.3-4.5,1.7C12.3,19.1,11.3,17.3,11.7,15.5L11.7,15.5z"/>
  </svg>
</template>

<script>
export default {
  props: ['width', 'height']
}
</script>

<style lang="scss" scoped>
  .icon-share {
  }
</style>
