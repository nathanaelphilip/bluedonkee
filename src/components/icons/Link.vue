<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 19 19"
    style="enable-background:new 0 0 19 19;"
    xml:space="preserve"
    :height="height"
    :width="width"
    :class="`icon-link ${theme}`"
  >
    <path d="M7.1,8.7l0.8,0.8l-2.4,2.4c-0.4,0.4-0.4,1.2,0,1.6c0.4,0.4,1.2,0.4,1.6,0l2.4-2.4l0.8,0.8c0.9,0.9,0.9,2.3,0,3.2l-3.2,3.2c-0.9,0.9-2.3,0.9-3.2,0l-3.2-3.2c-0.9-0.9-0.9-2.3,0-3.2l3.2-3.2C4.8,7.8,6.2,7.8,7.1,8.7zM15.1,0.7l3.2,3.2c0.9,0.9,0.9,2.3,0,3.2l-3.2,3.2c-0.9,0.9-2.3,0.9-3.2,0l-0.8-0.8l2.4-2.4c0.4-0.4,0.4-1.2,0-1.6c-0.4-0.4-1.2-0.4-1.6,0L9.5,7.9L8.7,7.1c-0.9-0.9-0.9-2.3,0-3.2l3.2-3.2C12.8-0.2,14.2-0.2,15.1,0.7z"/>
  </svg>
</template>

<script>
export default {
  props: ['theme', 'width', 'height']
}
</script>

<style lang="scss" scoped>
  .icon-link {}
</style>
