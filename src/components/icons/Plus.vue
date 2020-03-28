<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 12 12"
    style="enable-background:new 0 0 12 12;"
    xml:space="preserve"
    :height="height"
    :width="width"
    :class="`icon-plus`"
  >
    <path d="M11,5H7V1c0-0.6-0.4-1-1-1S5,0.4,5,1v4H1C0.4,5,0,5.4,0,6s0.4,1,1,1h4v4c0,0.6,0.4,1,1,1s1-0.4,1-1V7h4c0.6,0,1-0.4,1-1S11.6,5,11,5z"/>
  </svg>
</template>

<script>
export default {
  props: ['width', 'height']
}
</script>

<style lang="scss" scoped>
  .icon-plus {}
</style>
