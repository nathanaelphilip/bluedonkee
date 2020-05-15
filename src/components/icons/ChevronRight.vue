<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 6 10"
    style="enable-background:new 0 0 6 10;"
    xml:space="preserve"
    :height="height"
    :width="width"
    :class="`icon-arrow-up ${theme}`"
  >
    <path d="M0.3,0.3C0.5,0.1,0.7,0,1,0c0.3,0,0.5,0.1,0.7,0.3l4,4c0.4,0.4,0.4,1,0,1.4l-4,4c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4L3.6,5L0.3,1.7C-0.1,1.3-0.1,0.7,0.3,0.3z"/>
  </svg>
</template>

<script>
export default {
  props: ['theme', 'width', 'height']
}
</script>

<style lang="scss" scoped>
</style>
