<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 10 6"
    style="enable-background:new 0 0 10 6;"
    xml:space="preserve"
    :height="height"
    :width="width"
    :class="`icon-arrow-up ${theme}`"
  >
    <path d="M9.7,0.3C9.9,0.5,10,0.7,10,1S9.9,1.5,9.7,1.7l-4,4c-0.4,0.4-1,0.4-1.4,0l-4-4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0L5,3.6l3.3-3.3C8.7-0.1,9.3-0.1,9.7,0.3z"/>
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
